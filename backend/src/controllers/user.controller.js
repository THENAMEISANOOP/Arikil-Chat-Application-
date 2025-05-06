

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