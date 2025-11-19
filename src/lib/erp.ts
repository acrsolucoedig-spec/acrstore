import { supabase } from "@/lib/supabase";

export type Product = {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  status: "active" | "low" | "critical" | string;
  description?: string;
  created_at?: string;
};

export type CreateProductInput = {
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  status?: Product["status"];
  description?: string;
};

export type OrderType = "delivery" | "pickup";
export type OrderStatus = "pending" | "ready" | "in_transit" | "completed" | string;

export type Order = {
  id: string;
  customer: string;
  items: string;
  total: number;
  type: OrderType;
  status: OrderStatus;
  address: string;
  date: string;
  created_at?: string;
};

export type ServiceOrder = {
  id: string;
  customer: string;
  device: string;
  issue: string;
  status: "in_progress" | "waiting" | "completed" | string;
  priority: "high" | "medium" | "low" | string;
  date: string;
  created_at?: string;
};

export type CreateOrderInput = {
  id: string;
  customer: string;
  items: string;
  total: number;
  type: OrderType;
  status: OrderStatus;
  address: string;
  date: string;
};

export type CreateServiceOrderInput = {
  id: string;
  customer: string;
  device: string;
  issue: string;
  status: ServiceOrder["status"];
  priority: ServiceOrder["priority"];
  date: string;
};

export type UpdateOrderStatusInput = {
  id: string;
  status: OrderStatus;
};

export type UpdateServiceOrderStatusInput = {
  id: string;
  status: ServiceOrder["status"];
  priority?: ServiceOrder["priority"];
};

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as Product[];
};

export const fetchOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as Order[];
};

export const fetchServiceOrders = async (): Promise<ServiceOrder[]> => {
  const { data, error } = await supabase
    .from("service_orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as ServiceOrder[];
};

export const createProduct = async (payload: CreateProductInput): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .insert({ ...payload, status: payload.status ?? "active" })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Product;
};

export const createOrder = async (payload: CreateOrderInput): Promise<Order> => {
  const { data, error } = await supabase
    .from("orders")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Order;
};

export const createServiceOrder = async (
  payload: CreateServiceOrderInput
): Promise<ServiceOrder> => {
  const { data, error } = await supabase
    .from("service_orders")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as ServiceOrder;
};

export const updateOrderStatus = async (payload: UpdateOrderStatusInput): Promise<Order> => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: payload.status })
    .eq("id", payload.id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Order;
};

export const updateServiceOrderStatus = async (
  payload: UpdateServiceOrderStatusInput
): Promise<ServiceOrder> => {
  const { data, error } = await supabase
    .from("service_orders")
    .update({ status: payload.status, priority: payload.priority })
    .eq("id", payload.id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as ServiceOrder;
};
