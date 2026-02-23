import client from "./Client";


// 마이페이지 조회
export const getMypageContent = () =>
    client.get("/api/member/me");

export const putUpdateNickname = (nickname) =>{
    
    return client.put("/api/member/me/update", {
        memberNickname: nickname
    });
}

export const putUpdatePassword = (currentPassword, newPassword) => {
    return client.put("/api/member/me/update", {
        MemberPassword: currentPassword,
        NewPassword: newPassword
    });
}