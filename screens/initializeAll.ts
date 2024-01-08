import { SecureStorage } from "../services/secureStorage";





export default async function InitialzeAll() {
    let result = await SecureStorage.getInst().getValueFor("AccNo")
     if (result){
        console.log("yes")
     }else{
        // console.log("nope")

        await SecureStorage.getInst().save("AccBal", "120000")
        await SecureStorage.getInst().save("fName", "Ajalla")
        await SecureStorage.getInst().save("lName", "Ugo")
        await SecureStorage.getInst().save("AccNo", "9102356712")
     }
}