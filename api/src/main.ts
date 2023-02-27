import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as fs from "fs";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: process.env.CORS_ORIGIN || "*",
    })

    const isDev = process.env.NODE_ENV !== "production";

    if (isDev) {
        const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));

        const config = new DocumentBuilder()
            .setTitle(pkg.title)
            .setDescription(pkg.description)
            .setVersion(pkg.version)
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup("docs", app, document);
    }

    console.log(process.env.MONGO_URI)
    await app.listen(process.env.API_PORT || 3000);
}

bootstrap();
