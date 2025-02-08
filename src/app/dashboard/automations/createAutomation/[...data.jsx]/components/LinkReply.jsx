import InputForAutomation from "./InputForAutomation"



const LinkReply = ({handleValue,url="",title="",loading}) => {
    return (
        <>
            <InputForAutomation
                heading={'Enter link'}
                name="url"
                value={url}
                handleValue={handleValue}
                type='input'
                disabled={loading}
            />
            <InputForAutomation
                heading={'Enter Link title'}
                name="title"
                value={title}
                handleValue={handleValue}
                type='input'
                disabled={loading}
            />
        </>
    )
}

export default LinkReply