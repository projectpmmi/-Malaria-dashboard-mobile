---
layout: default
---
[Home](./index.md) | [About](./about.md) | specifications | [User guide](./userguide.md)


# MAL - C - 008 Malaria Data Quality Assessment Mobile Application (M-RDQA) Software Requirement Specification (SRS)


## 1.0	Introduction
### 1.1	Purpose
The main purpose of this document is to give a detailed description of the application requirements for the M-RDQA Mobile application software. A detailed description of the malara data quality assessment tool can be found… 

### 1.2 	Project Scope
This document specifies requirements for the M-RDQA an android based application which will be used for Malaria data quality assessment. The application allows users to capture health facility related data from which a data quality assessment is generated. 

### 1.3	Production Document conventions
### 1.4 	Assumptions and Dependencies
### 1.5	Intended Audience
This document is primarily intended for:
Product owner who will approve the requirements
The development team
Testing team that validates the initial requirements
Project manager

### 1.6	References

## 2.0	Overall Description
### 2.1	Product Description
The application will run on android version 9.0 (Pie) operating system and above. Testing of the prototype and the alpha/beta versions will be carried out using Android Virtual Device (AVD) and a real android device meeting the hardware requirements.

#### 2.1.1  Use Case
The data quality tool is modeled after a WHO/MEASURE Evaluation supervisory checklist from the Data Quality Review (DQR) suite of tools.  The DQR is a holistic approach to data quality assurance, combining health facility data quality checks with aggregate data analysis to uncover gaps, inconsistencies, and outliers in the reported data.  The supervisory checklist is a routine application of this methodology and is meant to be implemented by district level supervisors conducting supervision in health facilities.  Results of the supervision visit (i.e. the completed checklist) should sync with a national database (e.g. DHIS 2) so that progress on data quality metrics (e.g. accuracy, completeness, etc.) can be monitored for facilities and districts, and over time.

Users (e.g. supervisors) would select a facility (or facilities) to be visited on a given day, or for a given outing, from a master facility list within the tool.  The list would come from the synced national database.  Users would then select the verifications they will be performing at the selected sites, for example, accuracy checks for 2 indicators (up to 5 can be selected) from a list of pre-populated indicators pulled from the national database.  They might also choose to check completeness of reporting, completeness of data sources, or both.  They can also select cross checks and consistency checks, or leave them until the next time.  Finally, there is a qualitative checklist which assesses the availability of important inputs to ensure data quality.  Not all elements need to be checked on every visit and the users can choose which to conduct on any given visit.

Users can also select specific thresholds for quality for different data quality metrics measured by the tool (i.e. the acceptable margin of error).  Results that fall outside the established range for quality would then be flagged for follow-up.

The national database would require adaptation to the metadata to accommodate data quality metrics.  For example, accuracy of reporting for priority malaria indicators, percent concordance between data sources for cross checks, completeness of reporting, adequacy of source documents (for each source document), completeness of data elements (for each priority data element), consistency of reporting of priority data elements, and timeliness of reporting should be added to the national database.  Users could then use dashboard capabilities in the national database to visualize trends in these metrics from an internet connected PC.

Given the resource constraints in the current SOW, the requirements will be broken out into Phase 1 and Phase 2 requirements. Phase 2 will be focused on more comprehensive integration with the DHIS2.


## 2.2	Operating Environment
The application will operate in the following operating environment:
Android Operating System 9.0 and above

## 2.3	Design and Implementation Constraints
The application will be created using Flutter, an open source User Interface software development kit created and maintained by Google. 

## 2.3	Specific Requirements
This section contains all the functional, non-functional and quality requirements of the application. It gives a detailed description of the application and all its features.

## Phase 1 Requirements

**Application Configuration requirements**
- Pull in indicators from national DHIS2
    - Do not need to give the indicators a type
- Ability to select which indicators from DHIS2 will be included in the setup of the application
- Provide default list of source documents
    - Client held record
    - Malaria case register
    - Monthly report
    - Laboratory register
    - Pharmacy dispensation log
    - ACT stock management log
    - Malaria surveillance reports
    - Bed nets stock management logs
    - Inpatient register
    - OPD register
    - Tally sheet
- Ability to customize the list of source documents
- Pull list of facilities from DHIS2
- Select facilities from DHIS2 to store in store
- Provide default list of Patient Level data elements to verify
    - Unique ID
    - Visit date 
    - Client name
    - Age
    - Diagnosis type
    - Test result (RDT)
    - Test result (microscopy)
    - Treatment with ACT
    - Other treatment
- Ability to customize list of data elements
- Provide default system assessment checklist
    - Is there a designated person to enter data and compile reports?
    - Is there a designated person to review the quality of compiled data prior to submission to the next level?					
    - Does the health facility have written guidelines on data collection and reporting for malaria?
    - Does the health facility have a reserve stock of blank registers or reporting forms?							
    - Has this health facility experienced any stock out of registers or reporting forms (since last visit)?				
    - Is a standardized register being used to record information on malaria cases (not improvised forms)?				
    - Can a patient's malaria diagnosis and treatment history be easily found in the facility records?					
    - Are data archives properly maintained with historical patient level (registers) and aggregate (monthly report) results?			
    - Does the facility maintain accurate demographic information for the catchment area (that is, a record current population and the number of births and deaths)?
    - Does the facility have established targets to monitor progress towards goals and objectives for malaria prevention and treatment?
    - Does the facility have an up-to-date display (for example, a chart on the wall) of the number of malaria cases diagnosed and treated by reporting period for the year?		
    - Is there a chart of disease incidence by month displayed at the facility?
- Ability to customize the system assessment checklist
- Select Default time period for review: 1 month or last 3 months
- **maybe** Remote database to store country configurations; the other teams will need to import this configuration file


**Supervisor/user functionality requirements**
- Visit planning screen
    - Select date of visit
    - Include ability to choose facility to be visited 
    - Choose verifications to perform for each facility to be visited 
        - Accuracy checks 
        - Completeness of data sources
        - Completeness of reporting
        - Completeness of data elements
        - Timeliness of submission of monthly report
        - Cross checks
        - Consistency checks
        - Qualitative system assessment checklist
- Visit Configuration based on verifications chosen
    - Accuracy checks 
        - Select indicators (which were pulled from DHIS2)
        - Time period to be verified (1 month or of last 3 months based on the configuration set)  
    - Completeness of data sources
        - Select data sources
    - Completeness of reporting
        - No choice
    - Completeness of data elements
        - Instructions: “This data element check is done on an OPD register or malaria case register.”
        - Select data elements
    - Timeliness of submission of monthly report 
        - No choice
    - Cross checks
        - Instructions: “Data sources are compared to determine the level of consistency and reliability between data sources with the same or similar information.Cross-checks are techniques to corroborate results found in one data source with data from a different data source. Select the source documents you will use for each of the 3 cross-checks.”
        - Cross Check A- Document 1 and Document 2
        - Cross Check B- Document 1 and Document 2
        - Cross Check C- Document 1 and Document 2
            - Instructions for Cross-Check C: “This Cross-Check is the comparison of service delivery volume between the service delivery information system (malaria or health programs) and the commodities tracking information system for indicators that use commodities, such as drugs or test kits (e.g., logistics management information system). Please choose one source document for each of these categories.”
    - Consistency checks
        - Selecting indicator
    - Qualitative system assessment checklist
        - No choice
    - Verification modules
        - Application should display whichever verification modules the user selected in the Visit Configuration module
    - Each module should be associated with:
        - Facility name and ID
        - Date of supervision
        - Reporting period verified
        - Supervision team lead (user conducting the verification)
    - Completeness of Malaria monthly report
        - Instructions to include: “Select the most recent completed and submitted monthly Malaria (or HMIS) facility report.  Calculate the number of cells expected to be complete on the monthly report (exclude cells for services not offered by the facility).  Count the number of cells that are complete (blank, not zero) and calculate the percentage completeness for the monthly report.”
        - Data elements for collection:
            - Expected cells
            - Completed cells
            - Comment: free text box
        - Calculation for the verification
            - COMPLETENESS_CALC_1: Percent complete for monthly report (completed cells / expected cells)
        - Screenshot from the Excel file:
![Table1](/assets/img/table1.png)

- Timeliness of Submission of Monthly Report
    - Instructions to include: Review the monthly reports from the past three months at the facility and in the HMIS database.  Determine if the reports were submitted by the deadline of reporting.
    - Data elements to be captured: 
        - Display the last 3 months from the date (from the visit configuration). For each month being verified, there is a data element “Submitted by Deadline” with answer choices Yes or No
        - Comment: free text box
    - Calculation for the verification:
        - TIMELINESS_CALC_1: Count the number of “yes” from the months being verified and divide by number months with the field complete (number of yes/number of months field completed)
    - Screenshot from the Excel file
![Table2](/assets/img/table2.png)

    - Data element completeness
        - Instructions to include: Missing data: ask to see the Malaria Register (or OPD register). Count the number of clients in the quarter (month 1 to month 3) with missing information for each of the following data elements in the unit malaria case register. 
    - Data elements to be collected
        - For each data element selected in the Visit configuration module, collect “Number of cases (rows) with missing data”- numeric value
        - “Number of entries missing data in at least one of the data elements above”- numeric value
        - Total number of entries for the period- numeric value
        - Comment: free text box
    - Calculation
        - DATAELEMENT_CALC_1: For each data element being checked “Percent cases with missing data” = (number of missing cases / total number of entries for the period).  
        - DATAELEMENT_CALC_2: “Percent of entries missing data from at least one of the data elements”= “Number of entries missing data in at least one of the data elements above”/Total number of entries for the period

Screenshot of excel (the data entry screen does not need to match this perfectly, it is just to show)
![Table3](/assets/img/table3.png)


    - Source Document Completeness
        - Instructions to include: “Review the following data sources and determine if they are available, up-to-date (values up to the current day/period) and standard (the form prepared and distributed by the program).  (Yes/No)”
        - For each source document selected in the visit configuration, collect the following data elements:
            - Available: Yes/No
            - Up-to-date: Yes/No
            - Standard Form: Yes/No
        - Comment: free text box
        - Calculations
            - SOURCEDOC_CALC_1: “Percent of documents available”= number of “yes” available of the documents/number of documents being verified
            - SOURCEDOC_CALC_2: “Percent of documents up-to-date”= number of “yes” up-to-date of the documents/number of documents being verified
            - SOURCEDOC_CALC_3: “Percent of documents using standard form”= number of “yes” standard form of the documents/number of documents being verified
            Screenshot of the excel

Data Accuracy Module
Instructions to include: “Recount value of indicators from the source document (e.g. malaria case register) and compare the value to the one reported by the facility for the selected months”
Data elements collected
For each indicator and month being verified, collect:
Source document recount- numeric value
HMIS monthly report value- numeric value
DHIS2 (or other database) monthly value- numeric value
Comment: free text box
Calculations (for each indicator and month being verified)
Instructions: “The recounted (that is, validated) value is divided by the reported value (from the monthly report) to derive the verification factor (VF). If there are discrepancies between the validated and the reported values, determine the cause and record the appropriate code on the form. The recounted value is also compared with the value found for the period in the malaria report. Two VFs are calculated from the three monthly values for recounted and reported values from two data sources. VF values of less than 0.9 (90%) or greater than 1.1 (110%) are indicative of data quality problems and should be investigated. Values should be tracked over time to determine the trend in reporting accuracy for the different indicators. If discrepancies are found, note the cause from the list provided. If the cause is not listed, include the cause under "other reason." Knowing the cause of discrepancies is important for determining what action to take to correct the problem, so it is important to accurately identify and record the reasons for discrepancies.”
ACCURACY_CALC_1:  “Monthly report verification factor (VF)”= source document recount/HMIS monthly report value
ACCURACY_CALC_2: “DHIS2 monthly verification factor (VF)”= source document recount/DHIS2 monthly value
Data element to be collected for each ACCURACY_CALC_1 and ACCURACY_CALC_2: “Reasons for discrepancy”- mark all that apply
no discrepancy
arithmetic errors
transcription errors
some documents were missing when the report was prepared
some documents are now missing
other (specify):___________________

Screenshot of excel



Cross Checks
Cross Check A
Instructions to include: Randomly select 10 patients who have been treated in the period at the facility from the [insert Document 1]
Data elements to collect:
Number of cases sampled from [insert Document 1]- numeric value
How many of the patients selected had a corresponding entry with matching information for the patients in the [insert Document 2]?- numeric value
Calculation
CROSSCHECKA_CALC_1: [Document 2] Reliability rate= How many of the patients selected had a corresponding entry with matching information for the patients in the [insert Document 2]/Number of cases sampled from [insert Document 1]
Reasons for discrepancies (select all that apply)
no discrepancy
arithmetic errors
transcription errors
drugs stock management forms not up to date
some documents are missing
stock out of treatment drugs
Cross Check B
Instructions to include: Randomly select 10 patients who have been treated in the period at the facility from the [insert Document 1]
Data elements to collect:
Number of cases sampled from [insert Document 1]- numeric value
How many of the patients selected had a corresponding entry with matching information for the patients in the [insert Document 2]?- numeric value
Comment: free text box
Calculation
CROSSCHECKB_CALC_1: [insert Document 2] Reliability Rate=How many of the patients selected had a corresponding entry with matching information for the patients in the [insert Document 2]/Number of cases sampled from [insert Document 1]
Reasons for discrepancies (select all that apply)
no discrepancy
arithmetic errors
transcription errors
drugs stock management forms not up to date
some documents are missing
stock out of treatment drugs

Cross Check C
Data elements to capture:
Number of units (e.g. doses of medication/vaccine, other commodities) in stock at the site at the beginning of the reporting period (initial in stock)- numeric value
Number of units received by the site during the reporting period (Received)
Number of units in stock at the site at the end of the reporting period (closing in stock)- numeric value
Number of units used (e.g. given to patients) by the site during the reporting period- numeric value
Comment: free text box

Calculation
CROSSCHECKC_CALC_1: Verification ratio= (Number of units (e.g. doses of medication/vaccine, other commodities) in stock at the site at the beginning of the reporting period (initial in stock)+Number of units received by the site during the reporting period (Received)-Number of units in stock at the site at the end of the reporting period (closing in stock)- numeric value)/Number of units used (e.g. given to patients) by the site during the reporting period- numeric value
Reasons for discrepancies (select all that apply)
no discrepancy
arithmetic errors
transcription errors
drugs stock management forms not up to date
some documents are missing
stock out of treatment drugs

Consistency Checks Module
Annual Consistency
Data elements to collect:
“What is the current month value for [insert indicator selected during visit configuration]?”- numeric value
“What was the value of the indicator for the current month one year ago?”- numeric value
Comment: free text box
Calculation:
ANNUAL_CONSIST_CALC_1: “The consistency ratio divides the value of the current month by the value from the same month last year.  If the value is more than 20% different (i.e. <0.8 or >1.2) this could indicate a data quality problem.” “Consistency ratio”= What is the current month value for [insert indicator selected during visit configuration]?/What was the value of the indicator for the current month one year ago?
Month-to-month consistency
Instructions: “Enter values for the selected indicator for the current month, and for the three preceding months.”
Data elements to collect:
“Current month [insert month] value”- numeric
Collect the “Value” for the previous 3 months from the current month (automatically insert the month names)
Month 1 [insert month] Value- numeric
Month 2 [insert month] Value- numeric
Month 3 [insert month] Value- numeric
Comment: free text box
Calculation:
MONTH_CONSIST_CALC_1: “The Consistency Ratio is Current month/average of Month1-Month3.  If the value is more than 20% different (i.e. <0.8 or >1.2) this could indicate a data quality problem.” “Consistency Ratio”= “Current month [insert month] value”/(average of Month 1, Month 2, Month 3 values)
Data element to collect with calculation:
Reason for discrepancy (select all that apply)
no discrepancy
arithmetic errors
transcription errors
drugs /vaccine stock management forms not up to date
some documents are missing
vaccine/drugs stock out
Other (specify):_________________
Screenshot from Excel


System Assessment
Instructions: “Respond Yes or No for the following questions.”
Data elements:
Use the questions configured for the system assessment checklist- all Yes or No answers
Calculation
SYS_ASSESS_CALC_1- “System readiness”= number of questions answered “Yes”/ divided by total number of questions with an answer
Screenshot from Excel

Action planning module
Data Improvement plan for the Health Facility
For action plan by site include: identified weakness, system strengthening measures, responsible person, deadline, comments
Action planning by District
For district planning include: program, date of action plan, then list of identified data quality challenges with system strengthening measures, responsible parties, deadline, and comments
Data visualization
Graphs that display the calculations by facility
Graph 1: Verification factors
Plot ACCURACY_CALC_1 and ACCURACY_CALC_2 for each indicator as a bar graph
Graph 2: Cross-checks 1 & 2
Plot CROSSCHECKA_CALC_1 & CROSSCHECKB_CALC_1 as a bar graph
Graph 3: Cross check 3
Plot CROSSCHECKC_CALC_1 as a bar graph
Graph 4: Reasons for discrepancy, by indicator
For each indicator in the Data accuracy module, plot the “reasons for discrepancy” selected in a stacked bar chart. Assign percentage to each discrepancy by 100% divided by number of discrepancies selected
Graph 5: Reporting performance & Readiness to provide quality data
Plot the following data as percentages in a bar graph
SYS_ASSESS_CALC_1: label= System assessment (% readiness)
SOURCEDOC_CALC_1: label- Source documents available
SOURCEDOC_CALC_2: label- Source documents up-to-date
SOURCEDOC_CALC_3: Label- source documents using standard form
TIMELINESS_CALC_1: Label- Timeliness of reporting
DATAELEMENT_CALC_2: Label- % of entries missing data
COMPLETENESS_CALC_1: label- Completeness of monthly report
Graph 6: Consistency over time: [insert indicator]
Plot the following 4 values from the month-to-month consistency module in a line graph
Current month [insert month] value
Month 1 [insert month] Value- numeric
Month 2 [insert month] Value- numeric
Month 3 [insert month] Value- numeric

*maybe requirement: be able to aggregate the facility scores across those visited in a supervisory visit 


Other Functional requirements
Ability to export data in a .csv format so that it can be aggregated across different supervisory visits on different devices
Be able send the exported data .csv via email
Ability to be used offline
Be able to generate list of metadata that can uploaded into DHIS2 so that DHIS2 can accept the exported RDQA results


ID: FR1 Application Form Based Authentication
DESC: User should be validated by logging into the application. Successful authentication should lead to resource authorization. Unsuccessful authentication should display a ‘user couldn’t authenticate’ notification
PRIORITY LEVEL = LOW

ID: FR2 Resource Authorization
DESC: Resource authorization will be based on roles. Only authenticated users with certain roles will be allowed to access certain resources with-in the application.
PRIORITY LEVEL = LOW

ID: FR3 Application Roles (DATA CAPTURE, DATA EDITOR)
DESC: The application will support read only, write only and read/write roles. (The different roles need to be further defined)
PRIORITY LEVEL = MEDIUM


ID: FR 6: Pull indicator and facility data from DHIS2
DESC: health facilities and indicator data will be pulled from DHIS2 to pre-populate Health Facility and Indicator dropdown menus. 
PRIORITY LEVEL = LOW

ID: FR 6: Instructions Checklist User Interface
DESC: A User Interface to display instructions on how to use the M-RDQA Tool. The instructions will be subdivided into several pages navigable by back and forward arrow buttons.
PRIORITY LEVEL = HIGH

ID: FR 7: Facility Information User Interface
DESC: A User Interface from which facilities to be supervised will be selected. 
PRIORITY LEVEL = HIGH



Non-functional Requirements
Offline
Maintainability
Security

Phase 2: DHIS configuration application
Need for Global setup functionality to be done by the National Malaria Control Program for country adaptation
Margin of error thresholds
Action planning module in DHIS2
Dashboards in DHIS2 (using DHIS2 dashboards)
E.g. trends for indicators
Comparisons of HFs in same district
Ranking of facilities on performance
DHIS2 application adds needed metadata to the DHIS2 system to store data quality metrics
Mobile application pushes data into DHIS2
Aggregation of recommendations by geographic area



Introduction
This phase of the project will consist of developing the Mobile M-RDQA metadata package for DHIS2 to allow seamless integration of the M-RDQA mobile application with a national DHIS2 database. This metadata package will also align with global standards promoted by WHO while keeping the ability for a more personalized experience. Our main philosophy will be to address specific malaria control programs challenges with a generic approach. 
Configuration packages consist of the following components:
data sets with data elements;
package-specific metadata objects (predictors, constants, organisation unit groups, etc);
a set of indicators;
analytical outputs (pivot tables, data visualizations and GIS favorites);
a set of dashboards.
These components are all linked, i.e. the indicators are based on the included data elements, the analytical outputs are based on the included indicators, and the dashboards are made up of the included analytical outputs.
Scope of this work


The scope of this work is to develop a DHIS2 metadata package aimed at installing all required data elements, indicators, dashboards and reports required to integrate the Mobile M-RDQA application.
This configuration package for DHIS2 will consists of a metadata file in JSON format which can be imported into a DHIS2 instance, as well as accompanying documentation. The package will provide pre-defined, standard content in line with the Malaria Routine Data Quality Assessment Tool. The package will be self-containing but will also align with WHO Malaria standardized Malaria package recommendations. 
This specification document describes a complete package that includes configurations of Malaria mobile data collection (data sets, data elements, validation rules) as well as analysis and dashboards (chart and pivot table favorites). This implies that the DHIS2 instance that the Mobile M-RDQA application will interface with will have to install this package that should not conflict with the existing metadata and complement the WHO metadata package if already installed. Any conflict will be resolved manually by the DHIS2 administrator following guidance documentation that will be provided.

This new module to be developed during the phase 2 of this project will not replace any of the app’s existing functionalities developed during phase 1 but rather complement them.


Use case:

The HMIS unit DHIS2 administrator willing to implement the Mobile M-RDQA application system wide, will download the M-RDQA Metadata package from PMI MEASURE Evaluation website or the DHIS2 play store and install it in his DHIS2 instance, making sure to resolve all potential metadata conflicts. This will result in the creation of a tracker program built around a “supervision” entity and a set of data elements corresponding to the M-RDQA key Malaria indicators (Prevention, testing, cases, treatment, commodity availability and mortality). The Metadata package will also generate a set of M-RDQA dashboards presenting individual health facility data quality visualizations, aggregate health facilities visualization, summary of content dashboard and action planning dashboard.

At the central level or district level an authorized user can now access the M-RDQA tracker module to define general and common supervision configurations to be pushed to all mobile clients by defining the following parameters:
Indicators to be used for M-RDQA supervision
Cross-checks
Consistency over time
Data Elements and source documents
Verification reporting periods


At this point the configuration can be imported in all targeted mobile M-RDQA applications and used for data supervision data entry. It is the responsibility of the mobile application user or administrator to define the specifics of the planned supervision such as date and exact location where the supervision will take place. The collected data can then be pushed back to DHIS2 and displayed in the tracker module as well as in the M-RDQA dashboards.
Phase 2 requirements:
This metadata package will generate a tracker module based on a “supervision” tracked entity and a set of dashboards.

M-RDQA Malaria Metadata package

Tracker metadata
Attributes



Data element
Indicators
1.0—Malaria prevention 
1.1 
Number of children under 5 who received ITN 
1.2 
Number of pregnant women who received ITN 
1.3 
Number of nets distributed to pregnant women 
1.4 
Number of nets distributed through routine immunization 
1.5 
Total number of nets distributed 
2.0—Malaria testing 
2.1 
Number of OPD visits for children (< 5) 
2.2 
Number of children (< 5) with fever 
2.3 
Number of children (5-14) with fever 
2.4 
Number of people (15+) with fever 
2.5 
Number of children (< 5) with fever tested (rapid diagnostic test [RDT] or microscopy) 
2.6 
Number of children (5-14) with fever tested (RDT or microscopy) 
2.7 
Number of people (15+) with fever tested (RDT or microscopy) 
3.0—Malaria cases 
3.1 
Number of children (< 5) with confirmed malaria (tested positive with RDT) 
3.2 
Number of children (5-14) with confirmed malaria (tested positive with RDT) 
3.3 
Number of people (15+) with confirmed malaria (tested positive with RDT) 
3.4 
Number of pregnant women with confirmed malaria (tested positive with RDT) 
3.5 
Number of cases tested negative with RDT across all categories 
3.6 
Number of confirmed malaria cases 
3.7 
Number of presumed malaria cases 
3.8 
Number of children (<5) with severe malaria 
3.9 
Number of children (5-14) with severe malaria 
3.10 
Number of people (15+) with severe malaria 
4.0—Malaria treatment 
4.1 
Number of children (< 5) with confirmed malaria receiving ACT 
4.2 
Number of children (5-14) with confirmed malaria receiving ACT 
4.3 
Number of people (15+) with confirmed malaria receiving ACT 
4.4 
Number of children (<5) receiving ACT 
4.5 
Number of children (5-14) receiving ACT 
4.6 
Number of people (15+) receiving ACT 
4.7 
Number of severe cases referred 
4.8 
Number of cases that tested negative with RDT receiving ACT 
5. 0—Malaria commodity availability 
5.1 
Stockout of ACTs for 7 consecutive days in the past month 
5.2 
Stockout of RDTs for 7 consecutive days in the past month 
5.3 
Stockout of SP for 7 consecutive days in the past month 
5.4 
Stockout of injectable artesunate for 7 consecutive days in the past month 
5.5 
Stockout of rectal artesunate for 7 consecutive days in the past month 
5.6 
Stockout of ITN for 7 consecutive days in the past month 
6.0—Malaria mortality 
6.1 
Total number of malaria deaths (inpatient only) 


These indicators will be disaggregated by:
Monthly Source document recount
HMIS monthly report value
DHIS2 monthly value

Registrers metadata
Malaria Data elements
1.
Unique ID
2.
Visit date 
3.
Client name
4.
Age
5.
Diagnosis (any type)
6.
Treatment with ACT
7.
Number of entries missing data in at least 1 of the 6 columns listed above
8.
Total number of entries for the period


Data source metadata
Malaria Source Documents:
Available
Up-to-date
Standard form
Comments
Malaria case register
 
 
 
 
Monthly report
 
 
 
 
Pharmacy dispensation log
 
 
 
 
ACT stock management log
 
 
 
 
Malaria surveillance reports
 
 
 
 
Client held record
 
 
 
 
Bed nets stock management logs
 
 
 
 
% Complete
-
-
-
 


Cross check metadata


A — Malaria case register : Laboratory register (quality target = 90%)
Randomly select 10 patients who have been treated in the period at the facility from the Malaria case register.
1. Number of cases sampled from the Malaria case register.
 
2. How many of the patients selected had a corresponding entry with matching information for the patients in the Laboratory register?
 
Laboratory register reliability rate:
-
B — Malaria case register : Pharmacy dispensation log (quality target = 90%)
Randomly select 10 cases who have been treated in the period at the facility from the Malaria case register.
1. Number of cases sampled from the Malaria case register.
 
2. How many of the patients selected had a corresponding entry with matching information for the patients in the Pharmacy dispensation log?
 
Pharmacy dispensation log reliability rate:
-
C — Malaria case register : ACT stock management log (quality target:  >=90%, <=110%)
 
Number of units (e.g. doses of medication/vaccine, other commodities) in stock at the site at the beginning of the reporting period (initial in stock)
a.
 
Number of units received by the site during the reporting period
b.
 
Number of units in stock at the site at the end of the reporting period (closing in stock)
c.
 
Number of units used (e.g. given to patients) by the site during the reporting period
d.
 
Verification ratio:   (d/[a+b-c]):
-
Reasons for discrepancy (enter code at right):
a) no discrepancy, b) arithmetic errors, c) transcription errors, d) drugs stock management forms not up to date, e) some documents are missing, f) stock out of treatment drugs,
 
g) other (specify)
 


data elements to receive data back from the mobile app


VisitID
Facility Name
Facility ID
Visit date
COMPLETENESS_CALC_1
TIMELINESS_CALC_1
Data element #1
DATAELEMENT_CALC_1
Data element #2
DATAELEMENT_CALC_1
Data element #3
DATAELEMENT_CALC_1
Data element #4
DATAELEMENT_CALC_1
Data element #5
DATAELEMENT_CALC_1
Data element #6
DATAELEMENT_CALC_1
DATAELEMENT_CALC_2
Source document 1
Available?
Up-to-date?
Standard form?
Source document 2
Available?
Up-to-date?
Standard form?
Source document 3
Available?
Up-to-date?
Standard form?
Source document 4
Available?
Up-to-date?
Standard form?
Source document 5
Available?
Up-to-date?
Standard form?
Source document 6
Available?
Up-to-date?
Standard form?
Source document 7
Available?
Up-to-date?
Standard form?
SOURCEDOC_CALC_1
SOURCEDOC_CALC_2
SOURCEDOC_CALC_3
Indicator 1
ACCURACY_CALC_1
ACCURACY_CALC_2
Indicator 2
ACCURACY_CALC_1
ACCURACY_CALC_2
Indicator 3
ACCURACY_CALC_1
ACCURACY_CALC_2
Cross Check A document 1
Cross Check A document 2
CROSSCHECKA_CALC_1
Cross Check B document 1
Cross Check B document 2
CROSSCHECKB_CALC_1
Cross Check C document 1
Cross Check C document 2
CROSSCHECKC_CALC_1
CoIndicator
ANNUAL_CONSIST_CALC_1
MONTH_CONSIST_CALC_1
SYS_ASSESS_CALC_1






M-RDQA Dashboards
health facility-specific dashboards

aggregate dashboards


Summary of content dashboard
A list of all comments noted throughout the tool, by data element (Figure 18). Each data element is listed, followed by the comments made for each facility, so that patterns can be easily recognized across facilities 

Action Planning for System Strengthening 
Data quality improvement plan for the health facility 

Figure 20. Summary of health facility-specific action plans 



Mobile M-RDQA application
Configuration screen
The Mobile M-RDQA application will by default load its configurations from the DHIS2 server which will define key parameters for the supervision to be conducted but will leave the specific of the supervision (date, facility, supervisors names, etc) to be done within the mobile application.
If no configuration is available on the server the Mobile M-RDQA app will still allow the user to create a personalized supervision configuration on the mobile device and allow the user to push the data collected to the DHIS2 server.


Detailed functionalities:

ID: FR1 Creation of the Tracker program
DESC: A dhis2 administrator should be able to use the tracker capture module to configure a new MDQA activity by defining general supervision parameters.
PRIORITY LEVEL = HIGH

ID: FR2 Supervision planning
DESC: The mobile M-RDQA user/administrator should be able to download the configuration data from the DHIS2 server and then be asked to select additional information such as the actual date of the supervision and the supervision team, and specific facilities.
PRIORITY LEVEL = HIGH 


ID: FR3 In case no configuration is found on DHIS2 server
In case no configuration has been found on the DHIS2 server, the mobile M-RDQA application should allow the user to configure his supervision as done previously in phase 1.

PRIORITY LEVEL = LOW 

ID: FR4 Supervision data submission
After the supervision visit the mobile MDQA application user should be able to submit the data back to DHIS2 server.

PRIORITY LEVEL = HIGH 

LoE Tracker

Based platform: DHIS2

Num
Features
Description
Priority
LOE
Due date
Responsible
Status
DHIS2 server based metadata package development
1
Create a tracker program
Create supervision tracked entity
Create M-RDQA program
registration stage = Indicator tab
Stage 1 = Health Facility Tab / Mobile csv export data
High
5 days
12/10/2021




2
Create Tracker indicators
create all indicators present in the dashboards graphs and table
High
6 days
12/22/2021




3
Create graphs and table
Use the visualization module to create graphics using the indicators
Medium
4 days
12/30/2021




4
Create the dashboard
Link the graphics into a dashboard
Low
2 days
12/30/2021




5
Generate the JSON Metadata package
Export all metadata from DHIS2
clean the metadata
package the metadata
share the metadata package (Website, DHIS2 play store)
High
4 days
12/30/2021








TOTAL


21 days






Mobile app development
6
Check availability of the metadata package on the DHIS2 server
Create a service to check if a metadata package is available or enabled on the DHIS2 server using unique code or name
High
3.5 days
02/18/2022




7
Update the configuration page to pull in the parameters from DHIS2 server (Indicator tab data)
Update the services to support logic for downloading parameter from DHIS2 when present or let the normal operation happen
High
4.5 days
02/28/2022




8
Export supervision data to DHIS2 server
Create a new service to export supervision data to the tracker API (Program Stage 1 = Health facility Tab)
High
7 days
03/04/2022




9


TOTAL


15 days






Environment and user guides
10
Development / Test server setup




2 days






11
DHIS2 metadata package testing




5 days






12 
Mobile app testing




5 days






13
Developers manual




6 days (3 Diao + 3 MM)






14
Metadata package import and conflict resolution manual




4.5 days IT adv 






15
Mobile app user guide




 4.5  days
M&E






16
Bugs revisions lead developer




8 days






17
Bugs revisions - 2nd developer




13 days










TOTAL


48










GRAND TOTAL


84













Notes:
 
June 8, 2021
Hoping to send next version of the application to Christina on Monday June 14
Any questions?


April 27, 2021
DHIs configuration
Push the data to dhis2
Configure the indicators in the app
Visualize the results
March 30, 2021
Will pull DHIS2 data elements to use as indicators
Will have a testable product by end of April
Have app ready for testing by April 26, 2021


February 16, 2021
Whatever level you choose in the configuration, in the search it will include the parent


Jan 11, 2021
Can likely pull in data elements from DHIS2 but it will be too much LOE at this point to push the data into DHIS2
Not realistic to expect to create an app that can configure the DHIS2 with current scope
Can we get a budget for the additional funds needed for our requirements?
If it is very simple- maybe 1 week of LOE?
Also needs dashboards in DHIS2
In the meantime, be able to view data from X number of facilities visited on the specific device (maybe no more than 12 facilities)
Be able to send a .csv file of results and email
Jan 5, 2021
Integration with DHIS2: this will require configuring an instance of DHIS2 to work with.
Had not considered this in the requirements
There needs to be authentication
 Should we build the app in DHIS2? Or do we want it to be free-standing?
It is meant to be integrated into the National Program. Routine application of the DQR during supervision. The metrics are aligned with what is in the DQR.
Then we can move towards a DHIS2 app. An organization can use it without their own DHIS2 by installing it on their own version of DHIS2. Operating system would become DHIS2.
We have to be a bit generic.
Next step: review specifications to make sure it is aligned with DHIS2.
To have a mobile app with configurations, it needs a web-based app behind it. Diao is building an Android app.
But what about offline mode? Then we need an Android app
Maybe we can do this step-by-step: first build the Android app; then add the DHIS2 app to make it easier to configure
Decision: develop an Android app and develop a configuration package
Configuration package: import data elements into DHIS2
Dave to provide data elements and make unique UIDs


