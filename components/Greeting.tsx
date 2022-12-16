import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import React from 'react'


export default function Greeting() {
    const { user } = useUser();
    console.log(user)
    return (
        <div>
            <h2>Hi {user?.nickname}</h2>
        </div>
    )
}