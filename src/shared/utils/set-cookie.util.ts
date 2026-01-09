import { CookieOptions, Response } from "express";

export const setCookie = (
    response: Response,
    name: string,
    value: string,
    options: CookieOptions // Este tiene un conjunto de opciones para setear las cookies
)=>{
    response.cookie(name, value,{
        path: '/',
        httpOnly: true, // Evita que puedan manipular las cookies con JS
        secure: false,
        sameSite: 'lax',

        ...options,
    });
};