import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

type FirebaseAdmin = admin.app.App;
type Credential = { credential: admin.credential.Credential };

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

export interface AccessToken {
  token: {
    value: string;
  };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private firebase: FirebaseAdmin;
  private readonly serviceAccount: ServiceAccount = {
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

  private firebaseConfig: Credential = {
    credential: admin.credential.cert(this.serviceAccount),
  };

  constructor() {
    if (!admin.apps.length) {
      this.firebase = admin.initializeApp(this.firebaseConfig);
    } else {
      this.firebase = admin.app();
    }
  }

  async use(req: Request, res: Response, next: () => void) {
    const { authorization } = req.headers;
    const token = authorization;

    if (!!token) {
      try {
        await this.firebase.auth().verifyIdToken(token.replace('Bearer ', ''));
        next();
      } catch (error) {
        console.log(error);
        this.accessDenied(req.url, res);
      }
    } else {
      this.accessDenied(req.url, res);
    }
  }

  async getAccesToken(uid: string): Promise<AccessToken> {
    try {
      const accessToken: AccessToken = {
        token: {
          value: await this.firebase.auth().createCustomToken(uid),
        },
      };
      return accessToken;
    } catch (error) {
      console.log('Error creating custom token:', error);
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(401).json({
      statusCode: 401,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
    });
  }
}
