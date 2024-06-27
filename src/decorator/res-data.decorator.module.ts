/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  DiscoveryModule,
  DiscoveryService,
  MetadataScanner,
  Reflector,
} from '@nestjs/core';
import {DynamicModule, Logger, Module, OnModuleInit} from '@nestjs/common';
import {
  Meta,
  RES_DATA_METADATA,
  ResDataDto,
  ResDataOptions,
} from './res-data.decorator';
import * as dayjs from 'dayjs';

@Module({
  imports: [
    DiscoveryModule,
  ],
})

export class ResDataModule implements OnModuleInit {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly scanner: MetadataScanner,

    private readonly reflector: Reflector
  ) {}

  static forRoot(): DynamicModule {
    return {
      module: ResDataModule,
      global: true,
    };
  }

  onModuleInit() {
    this.getMetadata();
  }

  getMetadata() {
    this.discovery
      .getProviders()
      .filter(wrapper => wrapper.isDependencyTreeStatic())
      .filter(({instance}) => instance && Object.getPrototypeOf(instance))
      .forEach(({instance}) => {
        this.scanner.scanFromPrototype(
          instance,
          Object.getPrototypeOf(instance),
          this.mapperData(instance)
        );
      });
  }

  mapperData(instance) {
    const {reflector} = this;

    return methodName => {
      const methodRef = instance[methodName];
      const metadata: ResDataOptions = reflector.get(
        RES_DATA_METADATA,
        methodRef
      );

      if (!metadata) return;

      const originMethod = (...args: unknown[]) =>
        methodRef.call(instance, ...args);

      instance[methodName] = async (...args: unknown[]) => {
        const data = await originMethod(...args);
        const meta: Meta = {
          paging: null,
          search: [],
          timestamp: null,
        };

        meta.timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');

        return new ResDataDto(data, true, null, meta);
      };
    };
  }
}
