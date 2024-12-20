import { Controller, Post } from "@nestjs/common";
import { TrainingService } from "./training.service";

@Controller('school')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post('/create')
  async savingRelation(): Promise<any> {
    // return this.trainingService.savingRelation();
  }

  @Post('/remove')
  async removingRelation(): Promise<void> {
    // await this.trainingService.removingRelation();
  }
}