import React from 'react';

function Footer(props) {
    return (
        <footer className='flex flex-col items-center pt-5 pb-3'>
            <div className="w-3/4 footer__top flex pb-2 flex justify-around gap-2">
                <div>
                    <a className='text-3xl font-700 logo__gradient'>ALUmineers</a>
                    <p>Your Alumni Events Platform</p>
                </div>
                <div>
                    <h3>Get in touch</h3>
                    <p>
                        For any enquiries, feel free to send us an email at 
                        &nbsp;
                        <a className='underline text-white' href="mailto:p.kishinyambwe@alustudent.com">
                            p.kishinyambwe@alustudent.com
                        </a>
                    </p>
                </div>


            </div>
            <div className='w-3/4 text-center pt-2 footer__bottom'>
                Copyright &copy; 2023<span> ALUmineers. All Rights Reserved.</span> 
            </div>
            
                        
        </footer>
    );
}

export default Footer;