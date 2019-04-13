import './sarl-competence.js';
import './sarl-comportement.js';

import { LitElement, html, css } from 'lit-element';

class SarlAgent extends LitElement {
  static get properties() {
    return {
      name: String,
      comportements: Array,
      competences: Array,
    }
  }

  render() {
    return html`
    <div>
    <h1>Agent</h1>
    <small>
    Un agent est une entité autonome possédant un ensemble de comportements (behavior) et de compétences (skill)
    pour réaliser les capacités (capacities) qu'il expose.
    Agent a has a set Sa of individual skills that may be used for building the
155 agent’s behaviors. Agent a defines the mapping Ma : C → S from one capacity
156 to a single skill implementation. From this definition, the agent a is able to
157 determine which skill should be used when a capacity’s action is invoked. A set of
158 capacity-skill pairs, named the built-in capacities (BIC) is defined into the SARL
159 specifications [10]. They are considered as essential to respect the commonly
160 accepted competences of agents, such autonomy, reactivity, pro-activity and
161 social capacities. The full set of BICs are presented in Section 4 because they
162 must be implemented into, and provided by the SARL run-time environment.
163 Among these BICs, the DefaultContextInteractions and
164 ExternalContextAccess capacities are defined. They give respectively
165 the access to the agent’s default context da, and the set Ca of contexts in which
166 the agents belong to, such that da ∈ Ca. ia represents the internal context of
167 the agent, which is detailed in Section 2.6.
168 Another BIC is the Behaviors capacity. It enables an agent to incorporate a
169 collection Ba ⊂ B of behaviors that will determine its global conduct. A behavior
170 b ∈ B maps a collection of perceptions represented by events to a sequence of
171 actions. Ob : E → P(A) is the mapping function in Equation 7.
b = hObi (7)
172 An agent has also a default behavior directly described within its definition. It
173 is illustrated by the relationship between Agent and Action types in Figure 1.
174 By default, the various behaviors of an agent communicate using an event175 driven approach. An event e ∈ E is the specification of anything that happens in
176 a space s, and may potentially trigger effects by a listener, e.g. agent, behavior.
    </small>
    <h3>
    Nom Agent : ${this.name}
    </h3>
    <ul>
    ${this.comportements.map((comp) => html`<li>
      <h4>
      Nom Comportement: ${comp.name}
      </h4>
      <sarl-comportement
      name="${comp.name}">
      </sarl-comportement>
      </li>`)
    }
    </ul>

    <ul>
    ${this.competences.map((compet) => html`<li>
      <h4>
      Nom competence: ${compet.name}
      </h4>
      <sarl-competence
      name="${compet.name}">
      </sarl-competence>
      </li>`)
    }
    </ul>

    </div>
    `;
  }

  constructor() {
    super();
    this.name = "Nom de l'agent";
    this.comportements = [
      {
        name: "comportement 1"
      },
      {
        name: "comportement 2"
      },
      {
        name: "comportement 3"
      }];
      this.competences = [
        {
          name: "competence 1"
        },
        {
          name: "competence 2"
        },
        {
          name: "competence 3"
        }]
      }
    }

    window.customElements.define('sarl-agent', SarlAgent);
