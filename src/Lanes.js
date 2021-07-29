import React from 'react';

class Template extends React.Component {
    constructor() {
        super();
        this.state = {color: "red"};
      }
    render() {
        return (
          <div id="lanes-block">
          <div class="disease_catastrophe disease_catastrophe_top lane"></div>
          <div class="disease_catastrophe disease_catastrophe_top lane-label">Disease/Catastrophe</div>
          <div class="disease_catastrophe disease_catastrophe_top lane-label right-side">Disease/Catastrophe</div>
          <div class="discovery_invention discovery_invention_top lane"></div>
          <div class="discovery_invention discovery_invention_top lane-label">Discovery/Invention</div>
          <div class="discovery_invention discovery_invention_top lane-label right-side">Discovery/Invention</div>
          <div class=" drug_company_history drug_company_history_top lane"></div>
          <div class=" drug_company_history drug_company_history_top lane-label">Drug Company History</div>
          <div class=" drug_company_history drug_company_history_top lane-label right-side">Drug Company History</div>
          <div class="legislation legislation_top lane"></div>
          <div class="legislation legislation_top lane-label">Legislation</div>
          <div class="legislation legislation_top lane-label right-side">Legislation</div>
          <div class="education education_top lane"></div>
          <div class="education education_top lane-label">Education</div>
          <div class="education education_top lane-label right-side">Education</div>
          <div class="health_science_history health_science_history_top lane"></div>
          <div class="health_science_history health_science_history_top lane-label">Health Science History</div>
          <div class="health_science_history health_science_history_top lane-label right-side">Health Science History</div>
          <div class="world_event world_event_top lane"></div>
          <div class="world_event world_event_top lane-label">World Event</div>
          <div class="world_event world_event_top lane-label right-side">World Event</div>
          <div class="century_marks century_marks_top lane"></div>

        </div>
        );
  }
}

export default Template;
