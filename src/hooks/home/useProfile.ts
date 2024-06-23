import { ProfileModel } from '@model/profile'
import { jwtDecode } from 'jwt-decode'

export function useProfile() {
    const token = localStorage.getItem("token") || ""
    const decode = jwtDecode(token)

    return decode as ProfileModel
}   