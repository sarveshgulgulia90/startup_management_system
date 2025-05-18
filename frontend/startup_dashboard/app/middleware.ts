import { NextRequest, NextResponse } from 'next/server'
import { getUser } from './utils/api';
import { redirect } from 'next/navigation';

export const config = {
    matcher: ['/student/:function*', '/founder/:function*']
}

export async function middleware(request: NextRequest) {
    const user = await getUser();
    if (user == null) {
        return NextResponse.rewrite(new URL(`/login`, request.url))
    }
    if (request.nextUrl.pathname.startsWith('/founder') && (user.user_type.upper() !== 'FOUNDER')) {
        return new NextResponse(null, {
            status: 403
        });
    }

    if (request.nextUrl.pathname.startsWith('/student') && (user.user_type.upper() !== 'STUDENT')) {
        return new NextResponse(null, {
            status: 403
        });
    }

    return NextResponse.next();
}