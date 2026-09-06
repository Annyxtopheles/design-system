'use client';
import React from 'react';
import { Accordion, AccordionItem } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function AccordionPlayground() {
  const defaultProps = {
      allowMultiple: false,
      variant: 'bordered'
    };
  const controls = [
      { name: 'allowMultiple', label: 'Allow Multiple Open', type: 'toggle' },
      { name: 'variant', label: 'Border Variant', type: 'select', options: [
        { label: 'Default', value: 'default' },
        { label: 'Bordered', value: 'bordered' },
        { label: 'Ghost', value: 'ghost' }
      ]}
    ];

  return (
    <ControlPanel
      componentName="Accordion"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ maxWidth: '500px', width: '100%', margin: '0 auto' }}>
        <Accordion allowMultiple={props.allowMultiple} variant={props.variant}>
          <AccordionItem title="Security Protocols & Zero Trust" defaultOpen>
            <p style={{ margin: 0, lineHeight: 1.6 }}>All ingress traffic is authenticated via mTLS with mandatory hardware token cryptographic signatures.</p>
          </AccordionItem>
          <AccordionItem title="High Availability & Failover SLA">
            <p style={{ margin: 0, lineHeight: 1.6 }}>Our global edge mesh ensures automatic node failover under 250 milliseconds with 99.999% uptime guarantee.</p>
          </AccordionItem>
          <AccordionItem title="Audit Logging & Compliance">
            <p style={{ margin: 0, lineHeight: 1.6 }}>Immutable audit logs are streamed to WORM-compliant storage in accordance with SOC2 Type II criteria.</p>
          </AccordionItem>
        </Accordion>
      </div>
    )}
    />
  );
}
