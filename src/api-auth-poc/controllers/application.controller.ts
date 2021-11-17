// An application controller.

import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Application')
@Controller('application')
export class ApplicationController {
    @Get('/public')
    publicResponse(): any {
        return { application: 'publicAplicationId', partnerKey: null };
    }

    // Private route.
    @UseGuards(AuthGuard('jwt'))
    @Get('/private')
    privateResponse(@Request() req: any): any {
        /* In the request object we now have the context of partner & user like below
            req.user = {
                partnerKey = "kxrODb3qdrkyHMvq3fBOVxneID7OX5QW"
                userInfo: {
                    "user_id": "sateesh.kadiyala@vouch.us",
                    "comapny_id": "c154bf3c-36d0-40ec-a687-abed1c2ce85a"
               } 
            }
        */
        /* Include business logic to validate,
             1. If the partner has access to this user's application backed by our DB.
             2. If the user belongs to that company and has access to this application (Backed by our DB, not sure if this can be answered by our existing DB Model).
        */
        return {
            application: 'privateApplicationId',
            partnerKey: req.user.partnerKey,
        };
    }
}
