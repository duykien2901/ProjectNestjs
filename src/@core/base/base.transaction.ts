import { Injectable } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

interface Callback {
  (queryRunner: QueryRunner): void;
}

@Injectable()
export class BaseTransaction {
  constructor(public connection: Connection) {}

  async startTransaction(callback: Callback) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // execute some operations on this transaction:
      // commit transaction now:
      await callback(queryRunner);
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }
}
