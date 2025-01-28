import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    console.log('IP Address:', req.ip); // Log the IP being used for tracking
    const ip = req.ip.replace(/^::ffff:/, '');

    return ip;
  }
}