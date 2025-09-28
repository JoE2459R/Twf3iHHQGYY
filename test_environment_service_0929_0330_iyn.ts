// 代码生成时间: 2025-09-29 03:30:18
import { Injectable } from '@angular/core';

// TestEnvironmentService 提供测试环境管理功能
@Injectable({
  providedIn: 'root'
})
export class TestEnvironmentService {

  private environments: { [key: string]: string } = {};

  constructor() {
    // 初始化测试环境变量
    this.environments['development'] = 'Development environment';
    this.environments['staging'] = 'Staging environment';
    this.environments['production'] = 'Production environment';
  }

  // 获取所有测试环境信息
  getEnvironments(): { [key: string]: string } {
    return this.environments;
  }

  // 根据环境名称获取环境信息
  getEnvironment(environmentName: string): string | undefined {
    if (environmentName in this.environments) {
      return this.environments[environmentName];
    } else {
      throw new Error('Environment not found');
    }
  }

  // 添加或更新测试环境信息
  addOrUpdateEnvironment(environmentName: string, environmentInfo: string): void {
    this.environments[environmentName] = environmentInfo;
  }

  // 删除测试环境信息
  deleteEnvironment(environmentName: string): void {
    if (environmentName in this.environments) {
      delete this.environments[environmentName];
    } else {
      throw new Error('Environment not found');
    }
  }
}
