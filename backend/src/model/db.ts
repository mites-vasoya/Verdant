import {PoolClient, QueryResult} from "pg";
import {getConnection} from "../utils/db_connection";

export class db {

  public table: string = "";
  public rpp: number = 20;
  public page: number = 0;
  public offset: number = this.rpp * (this.page - 1);
  public where: string = "";
  public join: string = "";
  public groupBy: string = "";
  public orderBy: string = "";

  constructor() {
  }

  async executeQuery(query: string, params?: any[]): Promise<any> {
    const client = await getConnection();
    try {
      let result: QueryResult = await client.query(query, params);
      switch (result.command) {
        case "SELECT" :
          return result.rows;
        case "INSERT":
          return result.rowCount;
        case "UPDATE":
          return result.rowCount;
        case "DELETE" :
          return result.rowCount;
        default :
          return result;
      }
    } finally {
      client.release();
    }
  }

  async beginTransaction(): Promise<PoolClient> {
    const client = await getConnection();
    await client.query('BEGIN');
    return client;
  }

  async commitTransaction(client: PoolClient) {
    await client.query('COMMIT');
    client.release();
  }

  async rollbackTransaction(client: PoolClient) {
    await client.query('ROLLBACK');
    client.release();
  }

  async logError(errorMessage: string): Promise<void> {
    const client = await getConnection();
    const logQuery = 'INSERT INTO error_logs (error_message) VALUES ($1)';
    await client.query(logQuery, [errorMessage]);
    client.release();
  }

  //Written Basic Select, Update & Delete Queries
  async select(fields: string = "*") {

    let query: string = "SELECT " + fields + " FROM " + this.table;

    if (this.join != "") query += this.join;
    if (this.where != "") query += " WHERE " + this.where;
    if (this.groupBy != "") query += " GROUP BY " + this.groupBy;
    if (this.orderBy != "") query += " ORDER BY " + this.orderBy;
    if (this.rpp > 0) query += " LIMIT " + this.rpp;
    if (this.rpp > 0 && this.offset > 0) query += " OFFSET " + this.offset;

    return this.executeQuery(query);
  }

  async insert(data: any[]) {
    console.log("Data : ", data);
    let columns: string[] = Object.keys(data[0]);

    let query: string = "INSERT INTO " + this.table + " (" + columns.join(", ") + ") VALUES ('";

    for (let i = 0; i < data.length; i++) {
      let values: string[] = Object.values(data[i]);


      query += values.join("', '");
    }

    query += "')";

    console.log("Insert Query : ", query);

    return await this.executeQuery(query);
  }

  async update(
    updateData: { [key: string]: any }
  ) {
    // Construct the SET clause for the columns to be updated
    const setClause = Object.keys(updateData)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');


    // Collect all the values that need to be updated
    const values = Object.values(updateData);

    let query = `UPDATE ${this.table} SET ${setClause} `;

    if (this.where != "") query += " WHERE " + this.where;

    console.log("Query : ", query);

    return await this.executeQuery(query, [...values]);
  }

  async upsert(data: any[], conflictColumns: string[]) {
    console.log("Data: ", data);

    // Extract column names from the first data object
    let columns: string[] = Object.keys(data[0]);

    // Construct the INSERT INTO part of the query
    let query: string = "INSERT INTO " + this.table + " (" + columns.join(", ") + ") VALUES ";

    // Construct the VALUES part of the query
    let valueStrings: string[] = [];
    let queryParams: any[] = [];
    let paramIndex = 1;

    for (let i = 0; i < data.length; i++) {
      let values: any[] = Object.values(data[i]);

      let placeholders = values.map(() => `$${paramIndex++}`).join(", ");
      queryParams.push(...values);

      valueStrings.push(`(${placeholders})`);
    }

    query += valueStrings.join(", ");

    // Construct the ON CONFLICT part of the query
    let conflictClause = conflictColumns.join(", ");
    let updateColumns = columns.filter(col => !conflictColumns.includes(col))
      .map(col => `${col} = EXCLUDED.${col}`)
      .join(", ");

    query += ` ON CONFLICT (${conflictClause}) DO UPDATE SET ${updateColumns}`;

    return await this.executeQuery(query, queryParams);
  }


}
