export const Status = {
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    ERROR: "ERROR"
}

export const successResponse = (data, message) => {
    const response = {
        message,
        data,
        status: Status.SUCCESS,
    }
    return response;
}


export const errorResponse = (err) => {
    let response;
    if (err?.msg) {
        response = {
            message: err.msg,
            status: Status.FAILURE,
            data: null
        }
    } else {
        response = {
            message: err.message,
            status: Status.ERROR,
            data: null
        }
    };
    return response;
}