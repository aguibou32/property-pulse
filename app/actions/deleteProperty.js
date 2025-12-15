'use server'
import cloudinary from '@/config/cloudinary'
import connectDB from '../config/database'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'
import { revalidatePath } from 'next/cache'

const  deletePropery = async (propertyId) => {
    const sessionUser = await getSessionUser()

    if(!sessionUser || !session.userId){
        throw new Error('User ID is required ')
    }

    const { userId } = sessionUser;

    const property = await Property.findById(propertyId)

    if(!property){
        throw new Error('Property not found')
    }

    // verify ownership
    if(!property.owner.toString() !== userId){
        throw new Error('Unauthrorized')
    }

    await property.deleteOne()

    // Extract public id from image URLS
    
}

