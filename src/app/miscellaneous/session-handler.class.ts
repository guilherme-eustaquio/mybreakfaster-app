export class SessionHandler {

    private static USER_DETAILS_KEY = "user-details";

    public static getUserDetails() {
        
        let userDetails = null;

        userDetails = JSON.parse(localStorage.getItem(SessionHandler.USER_DETAILS_KEY));
        
        return userDetails;
    }

    public static setUserDetails(userDetails : any) : void {
        localStorage.setItem(SessionHandler.USER_DETAILS_KEY, JSON.stringify(userDetails));
    }

    public static deleteUserDetails() : void {
        localStorage.removeItem(SessionHandler.USER_DETAILS_KEY);
    }

}