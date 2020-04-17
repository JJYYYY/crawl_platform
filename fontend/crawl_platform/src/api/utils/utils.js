export const catchError = (err) => {
    const error = err.toString()
    if (error.response) {
        // eslint-disable-next-line default-case
        switch (error.response.status) {
            case 400:
                break;
            case 401:
                break;
            case 403:
                break;
            default:
                break
        }
    }
    return Promise.reject(err)
}