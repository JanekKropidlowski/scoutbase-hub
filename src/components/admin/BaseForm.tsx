import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";
import cmsService from "@/services/cms";

type Base = Database['public']['Tables']['bases']['Row'];
type BaseInsert = Database['public']['Tables']['bases']['Insert'];
type BaseUpdate = Database['public']['Tables']['bases']['Update'];

interface BaseFormProps {
  base?: Base;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const BaseForm: React.FC<BaseFormProps> = ({ base, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Base>>({
    name: '',
    location: '',
    image: '',
    price: '',
    capacity: undefined,
    description: '',
    featured: false,
    contact_email: '',
    contact_phone: '',
    amenities: [],
    coordinates: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (base) {
      setFormData({
        name: base.name,
        location: base.location,
        image: base.image || '',
        price: base.price || '',
        capacity: base.capacity || undefined,
        description: base.description || '',
        featured: base.featured,
        contact_email: base.contact_email || '',
        contact_phone: base.contact_phone || '',
        amenities: base.amenities || [],
        coordinates: base.coordinates,
      });
    }
  }, [base]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Nazwa bazy jest wymagana";
    }

    if (!formData.location?.trim()) {
      newErrors.location = "Lokalizacja jest wymagana";
    }

    if (formData.capacity && formData.capacity < 1) {
      newErrors.capacity = "Pojemność musi być większa od 0";
    }

    if (formData.price && parseFloat(formData.price) < 0) {
      newErrors.price = "Cena nie może być ujemna";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? undefined : parseInt(value);
    setFormData(prev => ({
      ...prev,
      [name]: numValue,
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const amenities = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      amenities,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (base) {
        // Update existing base
        await cmsService.updateBase(base.id, formData as BaseUpdate);
        toast({
          title: "Baza zaktualizowana",
          description: "Baza harcerska została pomyślnie zaktualizowana",
        });
      } else {
        // Create new base
        await cmsService.createBase(formData as BaseInsert);
        toast({
          title: "Baza utworzona",
          description: "Nowa baza harcerska została pomyślnie utworzona",
        });
      }

      onSuccess?.();
    } catch (error) {
      console.error('Error saving base:', error);
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas zapisywania bazy",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{base ? 'Edytuj bazę' : 'Dodaj nową bazę'}</CardTitle>
        <CardDescription>
          {base ? 'Zaktualizuj informacje o bazie harcerskiej' : 'Wypełnij formularz, aby dodać nową bazę harcerską'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nazwa bazy *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                placeholder="Stanica Harcerska Biały Las"
                disabled={isSubmitting}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lokalizacja *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location || ''}
                onChange={handleInputChange}
                placeholder="Warmińsko-mazurskie, Mazury"
                disabled={isSubmitting}
                className={errors.location ? "border-red-500" : ""}
              />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL zdjęcia</Label>
            <Input
              id="image"
              name="image"
              type="url"
              value={formData.image || ''}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Cena</Label>
              <Input
                id="price"
                name="price"
                value={formData.price || ''}
                onChange={handleInputChange}
                placeholder="25 zł/os"
                disabled={isSubmitting}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Pojemność</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                value={formData.capacity || ''}
                onChange={handleNumberChange}
                placeholder="120"
                disabled={isSubmitting}
                className={errors.capacity ? "border-red-500" : ""}
              />
              {errors.capacity && (
                <p className="text-sm text-red-500">{errors.capacity}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Opis</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              placeholder="Opis bazy harcerskiej..."
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact_email">Email kontaktowy</Label>
              <Input
                id="contact_email"
                name="contact_email"
                type="email"
                value={formData.contact_email || ''}
                onChange={handleInputChange}
                placeholder="kontakt@baza.pl"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_phone">Telefon kontaktowy</Label>
              <Input
                id="contact_phone"
                name="contact_phone"
                value={formData.contact_phone || ''}
                onChange={handleInputChange}
                placeholder="+48 123 456 789"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amenities">Udogodnienia (oddzielone przecinkami)</Label>
            <Input
              id="amenities"
              name="amenities"
              value={formData.amenities?.join(', ') || ''}
              onChange={handleAmenitiesChange}
              placeholder="Wi-Fi, Parking, Kuchnia, Sanitariaty"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured || false}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, featured: checked }))
              }
              disabled={isSubmitting}
            />
            <Label htmlFor="featured">Baza polecana</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Anuluj
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Zapisywanie..." : (base ? "Zaktualizuj" : "Utwórz")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BaseForm;