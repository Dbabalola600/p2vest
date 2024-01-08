import { SecureStorage } from "../services/secureStorage"





export default async function WithdrawWallet(amt: any) {





    const AccBal = await SecureStorage.getInst().getValueFor("AccBal") as string
    if (parseFloat(AccBal) < amt) {
        // console.log("insufficient")
        return "insufficient"
    } else {
        const oper = parseFloat(AccBal) - amt
        if (Number.isNaN(oper)) {
            return "error"
        } else {
            return oper
        }
    }






}