import { Paystack } from "paystack-sdk"
import dotenv from "dotenv"
const payStackKey = "sk_test_7c642298d0dd7960b6b7232f419e37f07f08638a" //process.env.PAY_STACK_SECRET_KEY

dotenv.config()

if (!payStackKey) {
  throw new Error("Paystack secret key is not set. Check your environment variables.");
}
// Initialize Paystack with your public key
export const paystack = new Paystack(payStackKey);

