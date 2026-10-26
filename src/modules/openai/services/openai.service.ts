import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/user/schemas';
import { OpenAIService } from 'src/services';
import { PromptType, StoreOpenAiDto } from '../dto';
import { UserService } from 'src/modules/user/services';
import {
  fitnessPlanPrompt,
  fitnessPlanResponseFormat,
  nutritionPlanPrompt,
  nutritionPlanResponseFormat,
  skinCarePrompt,
  skinCareResponseFormat,
  waterPrompt,
  waterResponseFormat,
} from 'src/commons/constants';

@Injectable()
export class OpenAiService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly openAiAPI: OpenAIService,
    private readonly userService: UserService,
  ) {}

  async getAnalysis(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException(['User not found']);
    }
    const analysis = {};
    return analysis;
  }

  async getOpenAiResponse(userId: string, body: StoreOpenAiDto): Promise<any> {
    const { promptType } = body;
    switch (promptType) {
      case PromptType.FACE_SCAN:
        return this.userService.getUserAIJSON(userId, 'faceScan');
      case PromptType.SKIN_CARE:
        return this.userService.getUserAIJSON(userId, 'skinCare');
      case PromptType.NUTRITION_PLAN:
        return this.userService.getUserAIJSON(userId, 'nutritionPlan');
      case PromptType.FITNESS_PLAN:
        return this.userService.getUserAIJSON(userId, 'fitnessPlan');
      case PromptType.WATER:
        return this.userService.getUserAIJSON(userId, 'water');
      default:
        throw new BadRequestException('Invalid prompt type');
    }
  }

  async storeOpenAiResponse(
    userId: string,
    body: StoreOpenAiDto,
  ): Promise<any> {
    const { promptType } = body;
    const profilePicLink = await this.userService.getUserImageLink(userId);
    if (!profilePicLink) {
      throw new BadRequestException(['Profile picture not found']);
    }
    switch (promptType) {
      case PromptType.SKIN_CARE:
        return this.generateSkinCarePlan(userId, profilePicLink);
      case PromptType.NUTRITION_PLAN:
        return this.generateNutritionPlan(userId, profilePicLink);
      case PromptType.FITNESS_PLAN:
        return this.generateFitnessPlan(userId, profilePicLink);
      case PromptType.WATER:
        return this.generateWaterReminder(userId, profilePicLink);
      default:
        throw new BadRequestException('Invalid prompt type');
    }
  }

  private async generateSkinCarePlan(userId: string, profilePicLink: string) {
    const openaiResponse = await this.openAiAPI.analyzeImage(
      profilePicLink,
      skinCarePrompt,
      JSON.stringify(skinCareResponseFormat, null, 2),
    );
    await this.userService.createOpenAIResponseHistory(
      userId,
      PromptType.SKIN_CARE
    )
    await this.userModel.findByIdAndUpdate(userId, {
      skinCareJSON: openaiResponse,
    });
    return { message: 'Skin care plan generated', userId, skinCareJSON: openaiResponse, };
  }

  private async generateNutritionPlan(userId: string, profilePicLink: string) {
    // implement logic
    const openaiResponse = await this.openAiAPI.analyzeImage(
      profilePicLink,
      nutritionPlanPrompt,
      JSON.stringify(nutritionPlanResponseFormat, null, 2),
    );
    await this.userService.createOpenAIResponseHistory(
      userId,
      PromptType.NUTRITION_PLAN
    )
    await this.userModel.findByIdAndUpdate(userId, {
      nutritionPlanJSON: openaiResponse,
    });
    console.log('Generated Nutrition Plan');

    return {
      message: 'Nutrition plan generated',
      userId,
      nutritionPlanJSON: openaiResponse,
    };
  }

  private async generateFitnessPlan(userId: string, profilePicLink: string) {
    // implement logic

    const openaiResponse = await this.openAiAPI.analyzeImage(
      profilePicLink,
      fitnessPlanPrompt,
      JSON.stringify(fitnessPlanResponseFormat, null, 2),
    );
    await this.userService.createOpenAIResponseHistory(
      userId,
      PromptType.FITNESS_PLAN
    )
    await this.userModel.findByIdAndUpdate(userId, {
      fitnessPlanJSON: openaiResponse,
    });
    console.log('Generated Fitness Plan');

    return {
      message: 'Fitness plan is generated.',
      userId,
      fitnessPlanJSON: openaiResponse
    };
  }

  private async generateWaterReminder(userId: string, profilePicLink: string) {
    // implement logic
    const openaiResponse = await this.openAiAPI.analyzeImage(
      profilePicLink,
      waterPrompt,
      JSON.stringify(waterResponseFormat, null, 2),
    );
    await this.userService.createOpenAIResponseHistory(
      userId,
      PromptType.WATER
    )
    await this.userModel.findByIdAndUpdate(userId, {
      waterJSON: openaiResponse,
    });
    return { message: 'Water reminder set', userId, waterJSON: openaiResponse, };
  }
}
