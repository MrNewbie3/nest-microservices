import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://tfkuyqlp:cb3xGaqEUWVZ3Dz3G72QdymiZq1YpeSu@armadillo.rmq.cloudamqp.com/tfkuyqlp',
      ],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  app.listen();
}
bootstrap();
