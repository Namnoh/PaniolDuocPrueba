import { redirect } from "@sveltejs/kit";
import { user } from "../../stores";

export function load({cookies}){
    cookies.set('authToken', '', {maxAge:0});
    user.set(undefined);
    throw redirect(302, '/login');
}