import React from 'react';
import Container from '@/components/UI/Container';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <Container>
        <div className="text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Jalaj Sharma. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
