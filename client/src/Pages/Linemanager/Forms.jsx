import Navbar from '@/components/shared/Navbar';
import Sidenav from '@/components/shared/Sidenav';
import { useState } from 'react';
import Form from './Gajns';
// import React from 'react'

const Forms = () => {
    const [activeForm, setActiveForm] = useState(1);
  return (
    <section>
      <Navbar />
      <main>
        <div className="maindivider">
          <div className="sidenavSection">
            <Sidenav activeForm={activeForm} setActiveForm={setActiveForm}  />
          </div>
          <div className="remainingsection">
            <Form id={activeForm}/>
          
          </div>
        </div>
      </main>
    </section>
  );
};

export default Forms;
