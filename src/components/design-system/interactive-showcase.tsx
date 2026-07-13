"use client";
import { useState } from "react";
import {
  Accordion,
  Drawer,
  FilterChip,
  Modal,
  Tabs,
} from "@/components/ui/disclosure";
import {
  Checkbox,
  Radio,
  SelectControl,
  TextArea,
  TextField,
} from "@/components/forms/controls";
import { ResponsiveGrid } from "@/components/ui/system";
export function DesignSystemInteractive() {
  const [filter, setFilter] = useState("All");
  return (
    <div className="space-y-14">
      <ResponsiveGrid columns={2}>
        <TextField
          label="Project name"
          placeholder="e.g. Innovation Centre"
          hint="Used on your saved configuration."
        />
        <TextField
          label="Work email"
          type="email"
          defaultValue="invalid-address"
          error="Enter a valid email address."
        />
        <SelectControl label="Project sector" defaultValue="">
          <option value="" disabled>
            Select a sector
          </option>
          <option>Higher education</option>
          <option>Corporate workplace</option>
          <option>Healthcare</option>
        </SelectControl>
        <TextArea
          label="Project requirements"
          placeholder="Describe the room, technology and programme..."
        />
      </ResponsiveGrid>
      <div className="grid gap-8 md:grid-cols-2">
        <fieldset>
          <legend className="type-spec-label mb-3">Services</legend>
          <Checkbox label="Design consultation" defaultChecked />
          <Checkbox label="CAD and BIM files" />
          <Checkbox label="Sample request" />
        </fieldset>
        <fieldset>
          <legend className="type-spec-label mb-3">Project stage</legend>
          <Radio name="stage" label="Concept" defaultChecked />
          <Radio name="stage" label="Specification" />
          <Radio name="stage" label="Procurement" />
        </fieldset>
      </div>
      <div>
        <p className="type-spec-label mb-3">Filters</p>
        <div className="flex flex-wrap gap-2">
          {["All", "Presentation", "Collaboration", "Control"].map((label) => (
            <FilterChip
              key={label}
              selected={filter === label}
              onClick={() => setFilter(label)}
            >
              {label}
            </FilterChip>
          ))}
        </div>
      </div>
      <div className="grid gap-10 lg:grid-cols-2">
        <Accordion
          items={[
            {
              title: "Technology integration",
              content:
                "Displays, cameras, codecs and controls are accommodated within a coordinated platform.",
            },
            {
              title: "Service access",
              content:
                "Purposeful access routes support installation, maintenance and future equipment changes.",
            },
            {
              title: "Cable management",
              content:
                "Power and data pathways are separated, contained and accessible.",
            },
          ]}
        />
        <Tabs
          items={[
            {
              label: "Overview",
              content:
                "A concise overview of the product platform and its intended applications.",
            },
            {
              label: "Specifications",
              content:
                "Dimensions, capacity, materials, finishes and equipment compatibility.",
            },
            {
              label: "Downloads",
              content:
                "Technical drawings, BIM objects, specification sheets and installation guides.",
            },
          ]}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <Modal title="Request product information" triggerLabel="Open modal">
          <p className="type-body text-ink-muted">
            Dialog content is labelled, modal and dismissible with Escape or its
            close control.
          </p>
        </Modal>
        <Drawer title="Product filters" triggerLabel="Open drawer">
          <p className="type-body text-ink-muted">
            A focused mobile-friendly surface for secondary controls and
            navigation.
          </p>
        </Drawer>
      </div>
    </div>
  );
}
