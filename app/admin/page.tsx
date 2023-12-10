// AdminPage.jsx
'use client';

import React, { useEffect, useState } from 'react';
import EmptyState from "@/app/components/EmptyState";
import TripsClient from "./AdminReservationsClient";
import { SafeReservation, SafeUser } from '@/app/types'; 

const AdminPage = () => {
    const [reservations, setReservations] = useState<SafeReservation[]>([]);
    const [users, setUsers] = useState<SafeUser[]>([]); 

    useEffect(() => {

        fetch('/api/reser')
            .then(response => response.json())
            .then(data => setReservations(data))
            .catch(error => console.error('Failed to fetch reservations', error));


        fetch('/api/adminusers') 
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Failed to fetch users', error));
    }, []);

    if (reservations.length === 0 && users.length === 0) {
        return (
            <EmptyState
                title="No Data"
                subtitle="There are no reservations or user data to display."
            />
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '30px' }}>Admin Dashboard</h1>

            <div style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Reservations</h2>
                <TripsClient reservations={reservations} />
            </div>

            <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Users</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {users.map(user => (
                        <div key={user.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>

                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default AdminPage;
