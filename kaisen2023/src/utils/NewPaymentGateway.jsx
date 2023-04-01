import { useState } from 'react';
import { PaymentInitModal } from 'pg-test-project';
import './Payment.scss'



const NewPaymentGateway = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [clientCode, setClientCode] = useState("TM001");
    const [transUserName, setTransUserName] = useState("rajiv.moti_336");
    const [transUserPassword, setTransUserPassword] = useState("RIADA_SP336");
    const [authkey, setAuthkey] = useState("kaY9AIhuJZNvKGp2");
    const [authiv, setAuthiv] = useState("YN2v8qQcU3rGfA1y");
    const [callbackUrl, setCallbackUrl] = useState("/profile");

    const onSubmit = (e) => {
        e.preventDefault();
        if (clientCode && callbackUrl && transUserPassword && transUserName && authkey &&
            authiv) {
            setIsOpen(!isOpen)
        } else {
            alert("please all fields")
        }
    }

    return (
        <div className='pay-g'>

            <header className="App-header">
                <h1 className='text-center text-2xl font-semibold py-10'>Payment Gateway</h1>
                <form class="ui form" onSubmit={onSubmit} style={{ width: '400px' }}>
                    <div class="field">
                        <label style={{
                            textAlign: "left", color: "#fff", fontSize: "18px",
                            marginBottom: "10px", letterSpacing: "0.4px"
                        }}>ClientCode</label>
                        <input className="pay-inp" type="text" value={clientCode} onChange={(e) =>
                            setClientCode(e.target.value)} />
                    </div>
                    <div class="field" style={{ marginTop: "25px" }}>
                        <label style={{
                            textAlign: "left", color: "#fff", fontSize: "18px",
                            marginBottom: "10px", letterSpacing: "0.4px"
                        }}>Trans User Name</label>
                        <input className="pay-inp" type="text" value={transUserName} onChange={(e) =>
                            setTransUserName(e.target.value)} />
                    </div>
                    <div class="field" style={{ marginTop: "25px" }}>
                        <label style={{
                            textAlign: "left", color: "#fff", fontSize: "18px",
                            marginBottom: "10px", letterSpacing: "0.4px"
                        }}>Trans User Password</label>
                        <input className="pay-inp" type="text" value={transUserPassword} onChange={(e) =>
                            setTransUserPassword(e.target.value)} />
                    </div>
                    <div class="field" style={{ marginTop: "25px" }}>
                        <label style={{
                            textAlign: "left", color: "#fff", fontSize: "18px",
                            marginBottom: "10px", letterSpacing: "0.4px"
                        }}>Auth Key</label>
                        <input className="pay-inp" type="text" value={authkey} onChange={(e) =>
                            setAuthkey(e.target.value)} />
                    </div>
                    <div class="field" style={{ marginTop: "25px" }}>
                        <label style={{
                            textAlign: "left", color: "#fff", fontSize: "18px",
                            marginBottom: "10px", letterSpacing: "0.4px"
                        }}>Auth IV</label>
                        Page | 6
                        SUPPORT ESCALATION MATRIX
                         The merchant can coordinate with their Account Manager for any issue they face during the
                        integration of PG. The Account Manager will connect the merchant team with support team.
                         The mail Id for PG support is integration.support@SabPaisa.in . The merchant can also
                        drop the mail with the Client Code and screenshot of the issue on this mail id and the
                        support team will connect with the merchant.
                        Thank You!
                        <input className="pay-inp" type="text" value={authiv} onChange={(e) =>
                            setAuthiv(e.target.value)} />
                    </div>
                    <div class="field" style={{ marginTop: "25px" }}>
                        <label style={{
                            textAlign: "left", color: "#fff", fontSize: "18px",
                            marginBottom: "10px", letterSpacing: "0.4px"
                        }}>Call Back Url</label>
                        <input className="pay-inp" type="text" value={callbackUrl} onChange={(e) =>
                            setCallbackUrl(e.target.value)} />
                    </div>
                    <button class="bg-yellow-500 px-16 py-1.5 m-auto self-center rounded-lg my-10" type="submit">Submit</button>
                </form>
                {/* {(clientTxnId && clientCode) &&
<PaymentModal clientCode={clientCode} clientTxnId={clientTxnId}
isOpen={isOpen} label={"testing"} />
} */}
                {
                    (clientCode && callbackUrl && transUserPassword && transUserName && authkey
                        && authiv) && isOpen &&
                    <PaymentInitModal clientCode={clientCode}
                        transUserPassword={transUserPassword} transUserName={transUserName}
                        callbackUrl={callbackUrl} isOpen={isOpen} authkey={authkey} authiv={authiv}
                        label={"testing"} />
                }
            </header>
        </div>
    )
}

export default NewPaymentGateway