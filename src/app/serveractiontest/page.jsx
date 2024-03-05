const actionCallFun = async () => {
    "use server"

    console.log("it works");
}

const ServerActionPage = () => {

    return (
        <div>
            <form action={actionCallFun}>
                <button>Click</button>
            </form>
        </div>
    )
}

export default ServerActionPage;