// Tipos de las tablas de supabase/migrations, para que TypeScript avise si
// se pide una columna que no existe. Están escritos a mano con la misma forma
// que genera `supabase gen types typescript`; si cambia la migración, hay que
// cambiarlos también aquí.

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type Role = "user" | "admin";
type Author = "user" | "admin";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          role: Role;
          created_at: string;
        };
        // Los perfiles los crea el trigger al crearse el usuario de Auth
        Insert: { id: string; email: string; name?: string | null; role?: Role };
        // Un usuario solo puede cambiar su nombre (trigger protect_profile)
        Update: { name?: string | null; role?: Role };
        Relationships: [];
      };
      messages: {
        Row: {
          id: number;
          user_id: string;
          author: Author;
          body: string;
          category: string | null;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          author: Author;
          body: string;
          category?: string | null;
          read_at?: string | null;
        };
        Update: { body?: string; category?: string | null; read_at?: string | null };
        Relationships: [
          {
            foreignKeyName: "messages_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      events: {
        Row: {
          id: number;
          user_id: string;
          type: string;
          data: Json;
          created_at: string;
        };
        Insert: { user_id: string; type: string; data?: Json };
        Update: { type?: string; data?: Json };
        Relationships: [
          {
            foreignKeyName: "events_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      is_admin: { Args: Record<PropertyKey, never>; Returns: boolean };
      /** Marca como leídas mis respuestas en el hilo de quien llama (#31) */
      mark_replies_read: { Args: Record<PropertyKey, never>; Returns: number };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}
