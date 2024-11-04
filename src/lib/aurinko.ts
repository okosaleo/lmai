"use server";
import { auth } from "@clerk/nextjs/server"; 
import axios from "axios"


export const getAurinkoAuthUrl = async (serviceType: 'Google' | 'Office365') => {
    const { userId }  = await auth()
    if (!userId) throw new Error("Unauthorized")

        const params = new URLSearchParams({
            clientId: process.env.AURINKO_CLIENT_ID!,
            serviceType,
            scopes: 'Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All',
            responseType: "code",
            returnUrl: `${process.env.NEXT_PUBLIC_URL}/api/aurinko/callback`
        })

        return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`
}

export const exchangeCodeForAcceesToken = async (code: string) => {
    try {
        const response = await axios.post(`http://api.aurinko.io/api/auth/token/${code}`,
            {},
            {
                auth: {
                    username: process.env.AURINKO_CLIENT_ID!,
                    password: process.env.AURINKO_CLIENT_SECRET!,
                }
            })

            return response.data as {
               "accountId": 0,
               "accessToken": "string",
               "userId": "string",
               "userSession": "string"
            }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
        }
        throw new Error ('Failed to exchange code for access token')
    }
}

export const getAccountDetails = async (accessToken: string) => {
    try {
        const response = await axios.get('https://api.aurinko.io/v1/account', {
            headers: {
                'Authorization' : `Bearer ${accessToken}`
            }
        })
        return response.data as {
            email: string,
            name: string
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching account details:', error.response?.data)
        } else {
            console.error('Unexpected error fetching account details:', error)
        }
        throw error
    }
}