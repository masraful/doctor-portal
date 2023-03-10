import React from 'react';
import doctor from '../../../assets/images/doctor.png'
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';


const MakeAppointment = () => {
    return (
        <section className='mt-32'
            style={{
                background: `url(${appointment})`
            }}>
            <div className="hero  bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctor} className="-mt-32 hidden lg:block md:block lg:w-1/2 rounded-lg shadow-2xl" alt='' />
                    <div className='ml-7'>
                        <h3 className="font-bold mb-5 text-primary">Appointment</h3>
                        <h2 className='text-4xl font-bold'>Make an appointment Today</h2>
                        <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <PrimaryButton>Appointment</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;