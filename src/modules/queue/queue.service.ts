import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { UserService } from '../user/user.service';

@Processor('test-queue')
export class QueueService {
  constructor(private readonly userService: UserService) {}

  @Process('test')
  async testQueue(job: Job) {
    const user = await this.userService.findByEmail(job.data.email);
    console.log(user);
  }
}
