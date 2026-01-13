export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      assessment_questions: {
        Row: {
          assessment_id: string | null
          correct_answer: Json | null
          created_at: string
          created_by: string | null
          difficulty: string | null
          id: string
          module_id: string | null
          options: Json | null
          points: number
          question_text: string
          question_type: string
          tags: string[] | null
          version: number | null
        }
        Insert: {
          assessment_id?: string | null
          correct_answer?: Json | null
          created_at?: string
          created_by?: string | null
          difficulty?: string | null
          id?: string
          module_id?: string | null
          options?: Json | null
          points?: number
          question_text: string
          question_type?: string
          tags?: string[] | null
          version?: number | null
        }
        Update: {
          assessment_id?: string | null
          correct_answer?: Json | null
          created_at?: string
          created_by?: string | null
          difficulty?: string | null
          id?: string
          module_id?: string | null
          options?: Json | null
          points?: number
          question_text?: string
          question_type?: string
          tags?: string[] | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_questions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_questions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_submissions: {
        Row: {
          answers: Json | null
          assessment_id: string
          attempt_number: number
          created_at: string
          feedback: string | null
          file_paths: string[] | null
          graded_at: string | null
          graded_by: string | null
          id: string
          score: number | null
          status: Database["public"]["Enums"]["submission_status"]
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          assessment_id: string
          attempt_number?: number
          created_at?: string
          feedback?: string | null
          file_paths?: string[] | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          score?: number | null
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          assessment_id?: string
          attempt_number?: number
          created_at?: string
          feedback?: string | null
          file_paths?: string[] | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          score?: number | null
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_submissions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          attempt_limit: number | null
          closes_at: string | null
          course_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_randomized: boolean | null
          max_score: number
          module_id: string | null
          opens_at: string | null
          passing_score: number
          requires_attendance_check: boolean | null
          time_limit_minutes: number | null
          title: string
          type: Database["public"]["Enums"]["assessment_type"]
          updated_at: string
          weight: number
        }
        Insert: {
          attempt_limit?: number | null
          closes_at?: string | null
          course_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_randomized?: boolean | null
          max_score?: number
          module_id?: string | null
          opens_at?: string | null
          passing_score?: number
          requires_attendance_check?: boolean | null
          time_limit_minutes?: number | null
          title: string
          type: Database["public"]["Enums"]["assessment_type"]
          updated_at?: string
          weight?: number
        }
        Update: {
          attempt_limit?: number | null
          closes_at?: string | null
          course_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_randomized?: boolean | null
          max_score?: number
          module_id?: string | null
          opens_at?: string | null
          passing_score?: number
          requires_attendance_check?: boolean | null
          time_limit_minutes?: number | null
          title?: string
          type?: Database["public"]["Enums"]["assessment_type"]
          updated_at?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "assessments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_records: {
        Row: {
          id: string
          marked_at: string
          marked_by: string | null
          notes: string | null
          session_id: string
          status: Database["public"]["Enums"]["attendance_status"]
          user_id: string
        }
        Insert: {
          id?: string
          marked_at?: string
          marked_by?: string | null
          notes?: string | null
          session_id: string
          status: Database["public"]["Enums"]["attendance_status"]
          user_id: string
        }
        Update: {
          id?: string
          marked_at?: string
          marked_by?: string | null
          notes?: string | null
          session_id?: string
          status?: Database["public"]["Enums"]["attendance_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_records_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "attendance_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_sessions: {
        Row: {
          course_id: string
          created_at: string
          created_by: string | null
          group_id: string
          id: string
          lesson_id: string | null
          notes: string | null
          session_date: string
          session_time: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          created_by?: string | null
          group_id: string
          id?: string
          lesson_id?: string | null
          notes?: string | null
          session_date: string
          session_time?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          created_by?: string | null
          group_id?: string
          id?: string
          lesson_id?: string | null
          notes?: string | null
          session_date?: string
          session_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_sessions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_sessions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_sessions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: string | null
          new_value: Json | null
          old_value: Json | null
          reason: string | null
          record_id: string | null
          table_name: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: string | null
          new_value?: Json | null
          old_value?: Json | null
          reason?: string | null
          record_id?: string | null
          table_name: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          new_value?: Json | null
          old_value?: Json | null
          reason?: string | null
          record_id?: string | null
          table_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      certificate_verifications: {
        Row: {
          certificate_id: string
          id: string
          ip_address: string | null
          result: boolean
          user_agent: string | null
          verification_code: string
          verified_at: string
        }
        Insert: {
          certificate_id: string
          id?: string
          ip_address?: string | null
          result: boolean
          user_agent?: string | null
          verification_code: string
          verified_at?: string
        }
        Update: {
          certificate_id?: string
          id?: string
          ip_address?: string | null
          result?: boolean
          user_agent?: string | null
          verification_code?: string
          verified_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificate_verifications_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "certificates"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          certificate_number: string
          cohort_id: string
          created_at: string
          expires_at: string | null
          id: string
          issued_at: string | null
          pdf_path: string | null
          recommended_at: string | null
          recommended_by: string | null
          status: Database["public"]["Enums"]["certificate_status"]
          user_id: string
          verification_code: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          certificate_number: string
          cohort_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          issued_at?: string | null
          pdf_path?: string | null
          recommended_at?: string | null
          recommended_by?: string | null
          status?: Database["public"]["Enums"]["certificate_status"]
          user_id: string
          verification_code: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          certificate_number?: string
          cohort_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          issued_at?: string | null
          pdf_path?: string | null
          recommended_at?: string | null
          recommended_by?: string | null
          status?: Database["public"]["Enums"]["certificate_status"]
          user_id?: string
          verification_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      cohorts: {
        Row: {
          attendance_threshold: number
          code: string
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          pass_threshold: number
          retake_limit: number
          start_date: string | null
          status: Database["public"]["Enums"]["cohort_status"]
          updated_at: string
        }
        Insert: {
          attendance_threshold?: number
          code: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          pass_threshold?: number
          retake_limit?: number
          start_date?: string | null
          status?: Database["public"]["Enums"]["cohort_status"]
          updated_at?: string
        }
        Update: {
          attendance_threshold?: number
          code?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          pass_threshold?: number
          retake_limit?: number
          start_date?: string | null
          status?: Database["public"]["Enums"]["cohort_status"]
          updated_at?: string
        }
        Relationships: []
      }
      competencies: {
        Row: {
          code: string
          created_at: string
          description: string | null
          evidence_required: string | null
          id: string
          module_id: string
          performance_criteria: string | null
          sort_order: number | null
          title: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          evidence_required?: string | null
          id?: string
          module_id: string
          performance_criteria?: string | null
          sort_order?: number | null
          title: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          evidence_required?: string | null
          id?: string
          module_id?: string
          performance_criteria?: string | null
          sort_order?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "competencies_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      competency_evidence: {
        Row: {
          competency_id: string
          description: string | null
          evidence_type: string
          file_path: string | null
          id: string
          status: Database["public"]["Enums"]["competency_status"]
          submitted_at: string
          user_id: string
        }
        Insert: {
          competency_id: string
          description?: string | null
          evidence_type: string
          file_path?: string | null
          id?: string
          status?: Database["public"]["Enums"]["competency_status"]
          submitted_at?: string
          user_id: string
        }
        Update: {
          competency_id?: string
          description?: string | null
          evidence_type?: string
          file_path?: string | null
          id?: string
          status?: Database["public"]["Enums"]["competency_status"]
          submitted_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "competency_evidence_competency_id_fkey"
            columns: ["competency_id"]
            isOneToOne: false
            referencedRelation: "competencies"
            referencedColumns: ["id"]
          },
        ]
      }
      competency_signoffs: {
        Row: {
          assessor_id: string
          evidence_id: string
          feedback: string | null
          id: string
          signed_at: string
          status: Database["public"]["Enums"]["competency_status"]
        }
        Insert: {
          assessor_id: string
          evidence_id: string
          feedback?: string | null
          id?: string
          signed_at?: string
          status: Database["public"]["Enums"]["competency_status"]
        }
        Update: {
          assessor_id?: string
          evidence_id?: string
          feedback?: string | null
          id?: string
          signed_at?: string
          status?: Database["public"]["Enums"]["competency_status"]
        }
        Relationships: [
          {
            foreignKeyName: "competency_signoffs_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "competency_evidence"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          code: string
          cohort_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_prerequisite: boolean | null
          is_support_track: boolean | null
          name: string
          practical_weight: number | null
          sort_order: number
          theory_weight: number | null
          updated_at: string
        }
        Insert: {
          code: string
          cohort_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_prerequisite?: boolean | null
          is_support_track?: boolean | null
          name: string
          practical_weight?: number | null
          sort_order?: number
          theory_weight?: number | null
          updated_at?: string
        }
        Update: {
          code?: string
          cohort_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_prerequisite?: boolean | null
          is_support_track?: boolean | null
          name?: string
          practical_weight?: number | null
          sort_order?: number
          theory_weight?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          cohort_id: string
          created_by: string | null
          enrolled_at: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          cohort_id: string
          created_by?: string | null
          enrolled_at?: string
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          cohort_id?: string
          created_by?: string | null
          enrolled_at?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      grades: {
        Row: {
          assessment_id: string | null
          course_id: string
          created_at: string
          graded_by: string | null
          id: string
          is_final: boolean | null
          is_published: boolean | null
          max_score: number
          notes: string | null
          score: number
          submission_id: string | null
          updated_at: string
          user_id: string
          weight: number
        }
        Insert: {
          assessment_id?: string | null
          course_id: string
          created_at?: string
          graded_by?: string | null
          id?: string
          is_final?: boolean | null
          is_published?: boolean | null
          max_score: number
          notes?: string | null
          score: number
          submission_id?: string | null
          updated_at?: string
          user_id: string
          weight?: number
        }
        Update: {
          assessment_id?: string | null
          course_id?: string
          created_at?: string
          graded_by?: string | null
          id?: string
          is_final?: boolean | null
          is_published?: boolean | null
          max_score?: number
          notes?: string | null
          score?: number
          submission_id?: string | null
          updated_at?: string
          user_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "grades_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "assessment_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          cohort_id: string
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          cohort_id: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          cohort_id?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          common_mistakes: string | null
          created_at: string
          id: string
          in_class_content: string | null
          module_id: string
          objectives: string | null
          post_class_content: string | null
          pre_class_content: string | null
          required_tools: string | null
          sort_order: number
          title: string
          updated_at: string
          week_number: number
        }
        Insert: {
          common_mistakes?: string | null
          created_at?: string
          id?: string
          in_class_content?: string | null
          module_id: string
          objectives?: string | null
          post_class_content?: string | null
          pre_class_content?: string | null
          required_tools?: string | null
          sort_order?: number
          title: string
          updated_at?: string
          week_number: number
        }
        Update: {
          common_mistakes?: string | null
          created_at?: string
          id?: string
          in_class_content?: string | null
          module_id?: string
          objectives?: string | null
          post_class_content?: string | null
          pre_class_content?: string | null
          required_tools?: string | null
          sort_order?: number
          title?: string
          updated_at?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          code: string
          course_id: string
          created_at: string
          description: string | null
          duration_hours: number | null
          id: string
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          code: string
          course_id: string
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          code?: string
          course_id?: string
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city: string | null
          created_at: string
          education_level: Database["public"]["Enums"]["education_level"] | null
          full_name: string
          id: string
          national_id: string | null
          phone: string | null
          referral_source: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          education_level?:
            | Database["public"]["Enums"]["education_level"]
            | null
          full_name: string
          id: string
          national_id?: string | null
          phone?: string | null
          referral_source?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          education_level?:
            | Database["public"]["Enums"]["education_level"]
            | null
          full_name?: string
          id?: string
          national_id?: string | null
          phone?: string | null
          referral_source?: string | null
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          course_id: string | null
          created_at: string
          description: string | null
          file_path: string | null
          file_size: number | null
          file_type: string | null
          id: string
          is_downloadable: boolean | null
          is_offline_available: boolean | null
          lesson_id: string | null
          module_id: string | null
          title: string
          updated_at: string
          uploaded_by: string | null
          version: number | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          is_downloadable?: boolean | null
          is_offline_available?: boolean | null
          lesson_id?: string | null
          module_id?: string | null
          title: string
          updated_at?: string
          uploaded_by?: string | null
          version?: number | null
        }
        Update: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          is_downloadable?: boolean | null
          is_offline_available?: boolean | null
          lesson_id?: string | null
          module_id?: string | null
          title?: string
          updated_at?: string
          uploaded_by?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resources_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resources_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      rubrics: {
        Row: {
          assessment_id: string
          created_at: string
          criterion: string
          description: string | null
          id: string
          is_safety_critical: boolean | null
          levels: Json
          max_points: number
          sort_order: number | null
        }
        Insert: {
          assessment_id: string
          created_at?: string
          criterion: string
          description?: string | null
          id?: string
          is_safety_critical?: boolean | null
          levels: Json
          max_points: number
          sort_order?: number | null
        }
        Update: {
          assessment_id?: string
          created_at?: string
          criterion?: string
          description?: string | null
          id?: string
          is_safety_critical?: boolean | null
          levels?: Json
          max_points?: number
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rubrics_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_questions: {
        Row: {
          created_at: string
          id: string
          is_required: boolean | null
          options: Json | null
          question_text: string
          question_type: string
          sort_order: number | null
          survey_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_required?: boolean | null
          options?: Json | null
          question_text: string
          question_type?: string
          sort_order?: number | null
          survey_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_required?: boolean | null
          options?: Json | null
          question_text?: string
          question_type?: string
          sort_order?: number | null
          survey_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_questions_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_responses: {
        Row: {
          answers: Json
          id: string
          ip_address: string | null
          submitted_at: string
          survey_id: string
          user_id: string | null
        }
        Insert: {
          answers: Json
          id?: string
          ip_address?: string | null
          submitted_at?: string
          survey_id: string
          user_id?: string | null
        }
        Update: {
          answers?: Json
          id?: string
          ip_address?: string | null
          submitted_at?: string
          survey_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
        ]
      }
      surveys: {
        Row: {
          closes_at: string | null
          cohort_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          opens_at: string | null
          title: string
          type: Database["public"]["Enums"]["survey_type"]
        }
        Insert: {
          closes_at?: string | null
          cohort_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          opens_at?: string | null
          title: string
          type: Database["public"]["Enums"]["survey_type"]
        }
        Update: {
          closes_at?: string | null
          cohort_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          opens_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["survey_type"]
        }
        Relationships: [
          {
            foreignKeyName: "surveys_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          description: string | null
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_attendance_percentage: {
        Args: { _course_id: string; _user_id: string }
        Returns: number
      }
      generate_certificate_number: {
        Args: { _cohort_id: string }
        Returns: string
      }
      has_any_role: {
        Args: {
          _roles: Database["public"]["Enums"]["app_role"][]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "system_admin"
        | "program_manager"
        | "course_manager"
        | "lead_instructor"
        | "assistant_instructor"
        | "examiner"
        | "me_officer"
        | "admin_finance"
        | "student"
        | "external_viewer"
      assessment_type: "quiz" | "assignment" | "practical_task" | "capstone"
      attendance_status: "present" | "late" | "excused" | "absent"
      certificate_status:
        | "pending"
        | "recommended"
        | "approved"
        | "issued"
        | "revoked"
      cohort_status: "planning" | "active" | "completed" | "archived"
      competency_status:
        | "not_started"
        | "in_progress"
        | "evidence_submitted"
        | "achieved"
        | "not_achieved"
      education_level:
        | "primary"
        | "secondary"
        | "diploma"
        | "bachelor"
        | "master"
        | "doctorate"
      submission_status: "pending" | "submitted" | "graded" | "returned"
      survey_type:
        | "baseline"
        | "endline"
        | "pulse"
        | "trainer_feedback"
        | "employment_1m"
        | "employment_3m"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "system_admin",
        "program_manager",
        "course_manager",
        "lead_instructor",
        "assistant_instructor",
        "examiner",
        "me_officer",
        "admin_finance",
        "student",
        "external_viewer",
      ],
      assessment_type: ["quiz", "assignment", "practical_task", "capstone"],
      attendance_status: ["present", "late", "excused", "absent"],
      certificate_status: [
        "pending",
        "recommended",
        "approved",
        "issued",
        "revoked",
      ],
      cohort_status: ["planning", "active", "completed", "archived"],
      competency_status: [
        "not_started",
        "in_progress",
        "evidence_submitted",
        "achieved",
        "not_achieved",
      ],
      education_level: [
        "primary",
        "secondary",
        "diploma",
        "bachelor",
        "master",
        "doctorate",
      ],
      submission_status: ["pending", "submitted", "graded", "returned"],
      survey_type: [
        "baseline",
        "endline",
        "pulse",
        "trainer_feedback",
        "employment_1m",
        "employment_3m",
      ],
    },
  },
} as const
