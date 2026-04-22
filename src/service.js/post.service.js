import {prisma} from '../lib/prisma.js'
import createHttpError from 'http-errors'

export const getAllPosts = async() => {
    const result = await prisma.post.findMany({
        orderBy : {createdAt : 'desc'},
        include : {
            postImages : true,
            user : {select : {username:true,profileImage:true}},
            comments : {
                include : {user : {select : {username:true,profileImage:true}}}
            },
            likes : {
                include : {user : {select : {username : true}}}
            },
            postArtists: {
                include: {
                artist: {
            select: { artistName: true, id: true } // เลือกเฉพาะชื่อและ ID ไปทำ Tag
          }
        }
      },


        }
    })

    return result
}

export const getAPost = async(postId) => {
    const result = await prisma.post.findUnique({
        where : {id : postId}
    })
    return result
}

export const createPost = async(title,content,image,userId,artistId) => {


// 1. เตรียมข้อมูลพื้นฐาน
    const postData = {
        title: title || null,
        content: content,
        userId: userId,
    };

    // 2. จัดการเรื่องรูปภาพ (ถ้ามี)
    if (image && image.length > 0) {
        postData.postImages = {
            create: image.map((imageUrl) => ({
                url: imageUrl
            }))
        };
    }

    // 3. จัดการเรื่อง Artist (ถ้ามี)
    // ✅ เอามาต่อกันตรงนี้ได้เลย Prisma จะจัดการสร้างลงตาราง PostArtist ให้พร้อมกัน
    if (artistId) {
        postData.postArtists = {
            create: {
                 artistId: Number(artistId)
            }
        };
    }

    // 4. บันทึกลง Database
    const result = await prisma.post.create({
        data: postData,
        // สั่งให้รีเทิร์นข้อมูลรูปกับศิลปินกลับมาด้วย
        include: {
            postImages: true,
            postArtists: {
                include: {
                    artist: true // แถมข้อมูล Artist กลับไปด้วยเลย
                }
            },
            user: true // แถมข้อมูลคนโพสต์กลับไปด้วยเพื่อเอาไปโชว์หน้า UI
        }
    });

    return result
}

export const deletePost = async(postId,userId) => {

    const foundPost = await getAPost(postId)

    if(!foundPost) {
        return (createHttpError[404]('Post not found'))
    }
    if(userId != foundPost.userId) {
        return (createHttpError[404]('Cannot delete this post'))
    }
    const result = await prisma.post.delete(
        {where : {id : postId}}
    )

    return result
}

export const editPost = async(postId,userId,title,content,image,artistId) => {
    const foundPost = await getAPost(postId)
    // console.log(foundPost)
    if(!foundPost) {
        return (createHttpError[404]('Post not found'))
    }
     if(userId != foundPost.userId) {
         return (createHttpError[404]('Cannot delete this post'))
    }



 // 2. จัดการ Query ของรูปภาพ
    let imageUpdateQuery = {};

    // ถ้ามี Array ของ image ส่งมาจากหน้าบ้าน (รวมรูปเก่าที่เหลือ + รูปใหม่แล้ว)
    if (image && Array.isArray(image)) {
        imageUpdateQuery = {
            postImages: {
                deleteMany: {}, // 👈 จุดสำคัญ: ลบรูปภาพเดิมในฐานข้อมูลของโพสต์นี้ทิ้งก่อน
                create: image.map((imageUrl) => ({
                    url: imageUrl // 👈 แล้วเอา Array ล่าสุดจากหน้าบ้าน มาสร้างบันทึกเข้าไปใหม่แทนที่
                }))
            }
        };
    }

    // 3. อัปเดตข้อมูล
    const result = await prisma.post.update({
        where: { id: postId },
        data: {
            title: title,
            content: content,
            artistId: artistId,
            ...imageUpdateQuery // เอาเงื่อนไขรูปภาพมาใส่ตรงนี้
        },
        include: {
            postImages: true // ให้ส่งข้อมูลรูปที่อัปเดตแล้วกลับมาด้วย
        }
    });

    return result;
}

export const commentPost = async (content,image,userId,postId) => {
    const result = await prisma.comment.create({
        data : {
            content : content,
            image : image || null,
            userId : userId,
            postId : postId
        },
        include : {
            user : {
                select : {
                    id : true,
                    username : true,
                    profileImage : true
                }
            }
        }
    })

    return result
}

export const getAllLike = async (postId) => {
    const foundPost = await prisma.post.findUnique({
        where : {id : postId}
    })

    if (!foundPost) {
        return (createHttpError[404]('cannot found Post'))
    }

    const result = await prisma.like.findMany({
        where : { postId : postId},
        include : {
            user : {
                select : {
                    username : true,
                    profileImage : true                }
            }
        }
    })

    return result

}

export const likePost = async (userId,postId) => {

    const postData = await prisma.like.findUnique({
        where: {
            userId_postId: { userId, postId }
        }
    })

    if (postData) {
		return (createHttpError[401]('cannot like this post'))
	}

    const haveLike = await prisma.like.findUnique({
        where : {
            userId_postId : {
                userId : userId,
                postId : postId
            }
        }
    })

    if(haveLike) {
        return (createHttpError[400]('already like this post'))
    }

    const result = await prisma.like.create({
        data : { userId: userId, postId: postId}
    })

    return result
}

export const unlikePost = async (userId,postId) => {

    const postData = await prisma.like.findUnique({
        where: {
            userId_postId: { userId, postId }
        }
    })

    if (!postData) {
		return (createHttpError[401]('cannot unlike this post'))
	}

    const result = await prisma.like.delete({
        where: {
            userId_postId: { userId, postId } 
        }
    })

    return result
}

export const editComment = async (userId,postId,commentId,newContent,image) => {

    const haveComment = await prisma.comment.findUnique({
        where : { id : commentId}
    })

    if(!haveComment){
        return (createHttpError[404],'Comment not found')
    }

    if(haveComment.postId !== postId) {
        return (createHttpError[400],'This comment does not belong to the specified post')
    }

    if(haveComment.userId !== userId) {
        return (createHttpError[403],'You are not authorized to edit this comment')
    }

    // เตรียม object สำหรับอัปเดต
    const updateData = {
        content: newContent
    };

    // ✅ เพิ่มการจัดการ image: ถ้ารับ image มาด้วย ค่อยเอาไปอัปเดต
    if (image !== undefined) {
        updateData.image = image;
    }

    const result = await prisma.comment.update({
        where : { id : commentId},
        data : updateData,
        include : {
            user : {
                select : {
                    id : true,
                    username : true,
                    profileImage :true
                }
            }
        }
    })

    return result
}

export const deleteComment = async (userId,postId,commentId) => {
    const haveComment = await prisma.comment.findUnique({
        where : {id : commentId}
    })

    if (!haveComment) {
        return createHttpError([404],'Comment not found')
    }

    if (haveComment.postId !== postId) {
        return createHttpError([400],'This comment does not belong to the specified post')
    }

    if (haveComment.userId !== userId) {
        return createHttpError([403],'You are not authorized to delete this comment')
    }

    const result = await prisma.comment.deleteMany({
        where : { id : commentId}
    })

    return result
}

