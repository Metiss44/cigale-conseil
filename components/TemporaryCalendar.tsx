'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react';

const hours = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

export const TemporaryCalendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleDateClick = (day: number) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleConfirm = () => {
        if (selectedDate && selectedTime) {
            const dateStr = selectedDate.toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
            alert(`Rendez-vous confirmé pour le ${dateStr} à ${selectedTime}`);
            setSelectedDate(null);
            setSelectedTime(null);
        }
    };

    const monthName = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const dayLabels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    
    const calendarDays: (number | null)[] = Array.from({ length: firstDay }, () => null);
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
    }

    return (
        <div className="bg-gradient-to-br from-brand-sage-light to-brand-cream p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            {/* Calendar Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-brand-sage-dark flex items-center">
                        <Calendar className="mr-2 text-brand-sage-medium" size={24} />
                        {monthName}
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={previousMonth}
                            className="p-2 hover:bg-brand-sage-medium hover:text-white rounded-lg transition"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextMonth}
                            className="p-2 hover:bg-brand-sage-medium hover:text-white rounded-lg transition"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Day labels */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {dayLabels.map((day) => (
                        <div key={day} className="text-center font-semibold text-brand-sage-medium text-sm py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day, index) => {
                        const isSelected = selectedDate && day === selectedDate.getDate();
                        const isToday = day && new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
                        
                        return (
                            <div key={index}>
                                {day ? (
                                    <button
                                        onClick={() => handleDateClick(day)}
                                        className={`w-full aspect-square rounded-lg font-semibold transition ${
                                            isSelected
                                                ? 'bg-brand-sage-medium text-white shadow-md'
                                                : isToday
                                                ? 'bg-brand-sage-dark text-white'
                                                : 'bg-white text-brand-sage-dark hover:bg-brand-sage-light'
                                        }`}
                                    >
                                        {day}
                                    </button>
                                ) : (
                                    <div className="w-full aspect-square" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
                <div className="animate-fadeIn">
                    <h4 className="text-lg font-bold text-brand-sage-dark mb-4 flex items-center">
                        <Clock className="mr-2 text-brand-sage-medium" size={20} />
                        Sélectionnez une heure pour le {selectedDate.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </h4>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {hours.map((hour) => (
                            <button
                                key={hour}
                                onClick={() => setSelectedTime(hour)}
                                className={`py-3 px-4 rounded-lg font-semibold transition ${
                                    selectedTime === hour
                                        ? 'bg-brand-sage-medium text-white shadow-md'
                                        : 'bg-white text-brand-sage-dark hover:bg-brand-sage-light border-2 border-brand-sage-light'
                                }`}
                            >
                                {hour}
                            </button>
                        ))}
                    </div>

                    {selectedTime && (
                        <div className="bg-white p-4 rounded-lg mb-6 border-l-4 border-brand-sage-medium">
                            <p className="text-brand-sage-dark font-semibold">
                                ✓ Rendez-vous programmé pour le {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à {selectedTime}
                            </p>
                        </div>
                    )}

                    <button
                        onClick={handleConfirm}
                        disabled={!selectedTime}
                        className={`w-full py-3 px-6 rounded-full font-bold text-lg transition ${
                            selectedTime
                                ? 'bg-brand-sage-medium text-white hover:bg-brand-sage-dark shadow-lg'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Confirmer le rendez-vous
                    </button>
                </div>
            )}
        </div>
    );
};
