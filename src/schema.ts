import {  gql } from "apollo-server";

export const typeDefs =  gql`
  type Query {
    relationType: RelationType
    organization(id: ID!): Organization
  }

  type Organization {
    id: ID!
    visiting_address: Address
    postal_address: Address
    relation_type: RelationType
    debtor: Debtor
    organization_size: OrganizationSize
  }

  type OrganizationSize {
    id: ID!
    name: String
  }

  type RelationType {
    id: ID!
    label: String
    color: String
  }

  type Debtor {
    payment_term: PaymentTerm
    provision_method: String
    provision_contactperson_id: Int
    attention_to: String
    attention_to_person_id: Int
    attention_to_fixed: String
    autocollect: Boolean
    reminders: Boolean
    cc: [String]!
    send_email_type: String
    send_email_email: String
    autosend_subscription_invoice: Boolean
    invoicetemplate_id: Int
  }

  type PaymentTerm {
    id: ID!
    name: String
    days: Int
    method: String
  }

  type Address {
    id: ID!
    country: String
    type: String
    line_1: String
    line_2: String
    postal_code: String
    province: String
    locality: String
    country_code: String
    country_id: Int
  }

  type VisitingAddress {
    id: ID!
    country: String
    type: String
    line_1: String
    line_2: String
    postal_code: String
    province: String
    locality: String
    country_code: String
    country_id: Int
	}
`;

