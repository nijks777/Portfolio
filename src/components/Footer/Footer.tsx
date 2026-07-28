import React from 'react';
import Container from '@/components/UI/Container';

export default function Footer() {
  return (
    <footer className="border-border bg-surface border-t py-8">
      <Container>
        <div className="text-muted text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Jalaj Sharma. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
