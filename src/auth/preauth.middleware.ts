import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

type FirebaseAdmin = admin.app.App;

interface ServiceAccount {
  type: string;
  projectId: string;
  privateKeyId: string;
  privateKey: string;
  clientEmail: string;
  clientId: string;
  authUri: string;
  tokenUri: string;
  authProviderX509CertUrl: string;
  clientC509CertUrl: string;
}

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  private firabase: FirebaseAdmin;

  constructor() {
    const serviceAccount: ServiceAccount = {
      type: process.env.FIREBASE_TYPE,
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_CLIENT_ID,
      authUri: process.env.FIREBASE_AUTH_URI,
      tokenUri: process.env.FIREBASE_TOKEN_URI,
      authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      clientC509CertUrl: process.env.FIREBASE_CLIENT_x509_CERT_URL,
    };

    this.firabase = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  use(req: Request, res: Response, next: () => void) {
    const { authorization } = req.headers;
    const token = authorization;

    if (!!token) {
      this.firabase
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          const user = {
            email: decodedToken.email,
          };
          req['user'] = user;
          next();
        })
        .catch((error: Error) => {
          console.log(error);
          this.accessDenied(req.url, res);
        });
    } else {
      next();
    }
  }

  // async getAccesToken(uid: string): Promise<string> {
  //   try {
  //     return await this.defaultApp.auth().createCustomToken(uid);
  //   } catch (error) {
  //     console.log('Error creating custom token:', error);
  //   }
  // }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
    });
  }
}
