import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req,res){
    try {
        const currentUserId=req.user.id;
        const currentUser=req.user;

        const recommendedUsers=await User.find({ 
            $and:[
                { _id: { $ne: currentUserId } }, // Exclude the current user
                { _id: { $nin: currentUser.friends } } ,// Exclude friends of the current user
                {isOnboarded:true}, // Only include users who are onboarded
            ]
         })
         res.status(200).json({
            success:true,
            message:"Recommended users fetched successfully",
            data:recommendedUsers
         })

    } catch (error) {
        console.error("Error fetching recommended users:", error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })

        
    }
}



export async function getMyFriends(req,res){
    try {
        const user=await User.findById(req.user.id).select("friends")
        .populate("friends","fullName profilePic nativeLanguage learningLanguage location bio isOnboarded");
        res.status(200).json({
            success:true,
            message:"Friends fetched successfully",
            data:user.friends
        })
    } catch (error) {
        console.error("Error fetching friends:", error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
        
    }
}

export async function sendFriendRequest(req,res){
    try {
        const myId=req.user.id;
        const {id:recipientId}=req.params;

        // prevent self friend request
        if(myId===recipientId){
            return res.status(400).json({
                success:false,
                message:"You cannot send friend request to yourself"
            })
        }
        const recipient=await User.findById(recipientId);
        if(!recipient){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        // already friends
        if(recipient.friends.includes(myId)){
            return res.status(400).json({
                success:false,
                message:"You are already friends with this user"
            })
        }
        // already sent friend request
        const existingRequest=await FriendRequest.findOne({
            $or:[
                { sender:myId, recipient:recipientId },
                { sender:recipientId, recipient:myId }
            ]
        });
        if(existingRequest){
            return res.status(400).json({
                success:false,
                message:"Friend request already sent"
            })
        }
        // create friend request
        const friendRequest=await FriendRequest.create({
            sender:myId,
            recipient:recipientId
        });
        // **additional step: add friend request to recipient's notifications
        // send notification to recipient
        // recipient.notifications.push({
        //     type:"friend-request",
        //     message:`${req.user.fullName} sent you a friend request`,
        //     sender:myId,
        //     isRead:false
        // });
        res.status(200).json({
            success:true,
            message:"Friend request sent successfully",
            data:friendRequest
        })
    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
        
    }
}