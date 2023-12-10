import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface AdminReservationsClientProps {
    reservations: SafeReservation[],
    currentUser?: SafeUser | null,
}

const AdminReservationsClient: React.FC<AdminReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const [deletingId, setDeletingId] = useState('');

    const onDelete = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');

                window.location.reload();
            })
            .catch((error) => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setDeletingId('');
            })
    }, []);

    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="List of all reservations"
            />
            <div
                className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
            >
                {reservations.map((reservation: any) => (

                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onDelete}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default AdminReservationsClient;
