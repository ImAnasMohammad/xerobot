import FacebookPages  from "@/models/FacebookPageDetails";

const savePages = async (pages)=>{
    try{
        const savedPages = await Promise.all(
            pages.map(async (page) => {
              try {
                const savedPage = await FacebookPages.findOneAndUpdate(
                  { pageId: page.id },
                  {
                    pageId: page.id,
                    name: page.name,
                    picture: page.picture.data.url,
                  },
                  { upsert: true, new: true }
                );
                return savedPage;
              } catch (err) {
                return null;
              }
            })
        );

        console.log(savedPages)

        return {
            success:true,
            message:"ok"
        }
    }catch(err){
        console.log(err.message)
        return {
            success:false,
            message:err.message,
            status:500
        }
    }
}

export default savePages